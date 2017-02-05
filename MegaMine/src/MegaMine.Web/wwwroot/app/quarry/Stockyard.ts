module MegaMine.Quarry {

    @controller("megamine", "MegaMine.Quarry.Stockyard")
    @inject("MegaMine.Quarry.QuarryService", "MegaMine.Quarry.QuarryUtility", "MegaMine.Shared.Constants",
                "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Template", "MegaMine.Shared.Messages")
    export class Stockyard {

        public grid: MegaMine.Shared.DataRecord.IDataRecordGrid<Stockyard, Models.IStockModel>;
        public processTypeEnum: typeof Models.ProcessType = Models.ProcessType;
        public yards: Models.IYardModel[] = [];
        public yardId: number = 0;
        public productTypes: Models.IProductTypeModel[] = [];
        public noStockMessage: string;

        constructor(private quarryService: QuarryService, private quarryUtility: QuarryUtility,
            private constants: Shared.Constants, private dialogService: Shared.Dialog.DialogService<Models.IStockModel>,
            private template: Shared.Template, private messages: Shared.Messages) {
            const self: Stockyard = this;

            self.grid = {
                options: {
                    columnDefs: [
                        { name: "blockNumber", field: "blockNumber", displayName: "Block #", type: "string" },
                        { name: "productType", field: "productType", displayName: "Type", type: "string" },
                        { name: "colour", field: "materialColour", type: "string", displayName: "Colour" },
                        { name: "texture", field: "texture", type: "string", displayName: "Texture" },
                        { name: "length", field: "length", type: "number", displayName: "Length" },
                        { name: "width", field: "width", type: "number", displayName: "Width" },
                        { name: "height", field: "height", type: "number", displayName: "Height" },
                        { name: "weight", field: "weight", type: "number", displayName: "Weight" },
                        {
                            name: "materialDate", field: "materialDate", displayName: "Date", type: "date",
                            cellFilter: "date:\"" + constants.dateFormat + "\""
                        },
                        { name: "quarry", field: "quarry", type: "string", displayName: "Quarry" },
                        template.getButtonColumnDefs("materialMovementId",
                            [
                                {
                                    buttonType: Shared.Models.ButtonType.edit,
                                    claim: "Quarry:MaterialUpdate",
                                    ngClick: "grid.appScope.grid.context.editStock(row.entity, $event)"
                                },
                                {
                                    buttonType: Shared.Models.ButtonType.delete,
                                    claim: "Quarry:MaterialDelete",
                                    ngClick: "grid.appScope.grid.context.deleteStock(row.entity, $event)"
                                }
                            ])
                    ]
                },
                data: quarryService.stock,
                context: self
            };

            // resetting the view model, so that it can be populated in the edit pop ups
            self.quarryService.materialViewModel = <Models.IMaterialViewModel> {};
            self.yards = quarryService.yardList;
            self.quarryService.stock.splice(0, quarryService.stock.length);
        }

        public getStock(form: ng.IFormController): void {
            const self: Stockyard = this;

            if (form.$valid) {
                self.noStockMessage = undefined;
                self.quarryService.getStock(self.yardId).then(function (): void {
                    if (self.quarryService.stock.length === 0) {
                        self.noStockMessage = self.messages.noStockMessage;
                    }
                });
            }
        }

        public editStock(model: Models.IStockModel, ev: ng.IAngularEvent): void {
            this.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev);
        }

        public deleteStock(model: Models.IStockModel, ev: ng.IAngularEvent): void {
            this.viewDialog(model, Shared.Dialog.Models.DialogMode.delete, ev);
        }

        public dialogInit = (dialogController: Shared.Dialog.DialogController<Models.IStockModel>, dialogModel: Models.IStockModel) => {
            const self: Stockyard = this;

            // making a backup copy of product types. this is need as we apply filters
            if (self.productTypes.length === 0) {
                angular.copy(self.quarryService.materialViewModel.productTypes, self.productTypes);
            } else {
                self.quarryService.materialViewModel.productTypes = angular.copy(self.productTypes);
            }
            self.quarryUtility.addMaterialWatchers(<Models.IMaterialScope>dialogController.$scope, dialogModel);
        };

        public viewDialog(model: Models.IStockModel, dialogMode: Shared.Dialog.Models.DialogMode, ev: ng.IAngularEvent): void {
            const self: Stockyard = this;

            model.currentYardId = self.yardId;
            self.dialogService.show({
                templateUrl: "stockyard_dialog",
                targetEvent: ev,
                data: {
                    model: model,
                    dataOptions: { viewModel: self.quarryService.materialViewModel, processTypeEnum: self.processTypeEnum }
                },
                dialogMode: dialogMode,
                dialogInit: self.dialogInit,
                resolve: {
                    resolveModel: function (): ng.IHttpPromise<Models.IMaterialViewModel> | boolean  {
                        if (Object.getOwnPropertyNames(self.quarryService.materialViewModel).length === 0) {
                            return self.quarryService.getMaterialViewModel();
                        } else {
                            return true;
                        }
                    }
                }
            })
                .then(function (dialogModel: Models.IStockModel): void {
                    if (dialogMode === Shared.Dialog.Models.DialogMode.delete) {
                        self.quarryService.materialDelete(dialogModel.materialId, model.currentYardId).then(function (): void {
                            self.dialogService.hide();
                        });
                    } else {
                        self.quarryUtility.clearByProcessType(dialogModel);
                        self.quarryService.materialUpdate(dialogModel).then(function (): void {
                            self.dialogService.hide();
                        });
                    }
                });
        }
    }
}

