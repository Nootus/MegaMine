module MegaMine.Quarry {

    @controller("megamine", "MegaMine.Quarry.Material")
    @inject("$scope", "MegaMine.Quarry.QuarryService", "MegaMine.Quarry.QuarryUtility",
        "MegaMine.Shared.Dialog.DialogUtility", "MegaMine.Shared.Utility", "MegaMine.Shared.Constants", "MegaMine.Shared.Template")
    export class Material {

        // variables access in the view
        public grid: MegaMine.Shared.DataRecord.IDataRecordGrid<Material, Models.IMaterialModel>;
        public model: Models.IStockModel = <Models.IStockModel>{};
        public previousModel: Models.IStockModel = <Models.IStockModel>{};
        public viewModel: Models.IMaterialViewModel = <Models.IMaterialViewModel>{};
        public processTypeEnum: typeof MegaMine.Quarry.Models.ProcessType = MegaMine.Quarry.Models.ProcessType;
        public editMode: boolean = false;

        constructor(private $scope: Models.IMaterialScope, private quarryService: QuarryService, private quarryUtility: QuarryUtility,
            private dialogUtility: Shared.Dialog.DialogUtility, private utility: Shared.Utility,
            private constants: Shared.Constants, private template: Shared.Template) {

            const self: Material = this;

            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "quarry", field: "quarry", type: "string", displayName: "Quarry" },
                    {
                        name: "materialDate", field: "materialDate", displayName: "Date", type: "date",
                        cellFilter: "date:\"" + constants.dateFormat + "\""
                    },
                    { name: "colour", field: "materialColour", type: "string", displayName: "Colour" },
                    { name: "blockNumber", field: "blockNumber", type: "string", displayName: "Block Number" },
                    { name: "length", field: "length", type: "number", displayName: "Length" },
                    { name: "width", field: "width", type: "number", displayName: "Width" },
                    { name: "height", field: "height", type: "number", displayName: "Height" },
                    { name: "weight", field: "weight", type: "number", displayName: "Weight" },
                    { name: "productType", field: "productType", displayName: "Product Type", type: "string" },
                    { name: "texture", field: "texture", displayName: "Texture", type: "string" },
                    template.getButtonColumnDefs("materialId",
                        [
                            {
                                buttonType: Shared.Models.ButtonType.edit, claim: undefined,
                                ngClick: "grid.appScope.grid.context.editRowMaterial(row.entity, $event)"
                            },
                            {
                                buttonType: constants.enum.buttonType.delete, claim: undefined,
                                ngClick: "grid.appScope.grid.context.deleteRowMaterial(row.entity, $event)"
                            }
                        ])
                ]
            };

            self.grid = {
                options: gridOptions,
                data: [],
                context: self
            };

            self.initialize();
        }

        private initialize(): void {
            const self: Material = this;

            self.viewModel = self.quarryService.materialViewModel;
            self.model = <Models.IStockModel>self.viewModel.model;
            self.model.materialDate = new Date();
            self.model.processTypeId = self.processTypeEnum.Cutting;

            self.viewModel.textures.unshift({ key: 0, item: "" });

            self.quarryUtility.addMaterialWatchers(self.$scope, self.model);
        }

        private updateDropDownText(): void {
            const self: Material = this;
            self.model.productType = self.utility.getItem(self.viewModel.productTypes, self.model.productTypeId,
                                                            "productTypeId", "productTypeName");
            self.model.materialColour = self.utility.getListItem(self.viewModel.materialColours, self.model.materialColourId);
            self.model.quarry = self.utility.getListItem(self.viewModel.quarries, self.model.quarryId);
            self.model.texture = self.utility.getListItem(self.viewModel.textures, self.model.textureId);
        }

        private resetModel(): void {
            const self: Material = this;
            self.model.blockNumber = undefined;
            self.model.length = undefined;
            self.model.width = undefined;
            self.model.height = undefined;
            self.model.weight = undefined;
            self.model.productTypeId = undefined;
        }

        public addMaterial(form: ng.IFormController): void {
            const self: Material = this;
            if (form.$valid) {
                self.quarryUtility.clearByProcessType(self.model);
                self.updateDropDownText();
                self.model.index = self.grid.data.length;
                if (self.model.textureId === 0) {
                    self.model.textureId = undefined;
                }
                self.grid.data.push(angular.copy(self.model));
                self.resetModel();
                form.$submitted = false;
            }
        }

        public saveMaterial(ev: MouseEvent): void {
            const self: Material = this;
            if (self.grid.data.length === 0) {
                self.dialogUtility.alert("No Materials", "Please add materials to save", ev);
            } else {
                self.dialogUtility.confirm("Confirm Save", "Please confirm to save the material", ev)
                    .then(function (): void {
                        self.quarryService.saveMaterial(self.grid.data)
                            .then(function (): void {
                                self.grid.data.splice(0, self.grid.data.length);
                                self.resetModel();
                            });
                    });
            }
        }

        public editRowMaterial(row: Models.IStockModel, ev: MouseEvent): void {
            const self: Material = this;
            self.previousModel = angular.copy(self.model);
            angular.extend(self.model, row);
            // bypassing watchers that calculate product type and weight
            self.model.bypassWeightWatcher = true;
            self.model.bypassProductTypeWatcher = true;
            self.editMode = true;
        }

        public deleteRowMaterial(row: Models.IStockModel, ev: MouseEvent): void {
            const self: Material = this;
            self.dialogUtility.confirm("Delete Material", "Are you sure you want to delete the material", ev)
                .then(function (): void {
                    self.grid.data.splice(row.index, 1);
                });
        }

        public cancelMaterial(form: ng.IFormController): void {
            const self: Material = this;
            angular.extend(self.model, self.previousModel);
            self.editMode = false;
        }

        public updateMaterial(form: ng.IFormController): void {
            const self: Material = this;
            if (form.$valid) {
                self.updateDropDownText();
                angular.extend(self.grid.data[self.model.index], self.model);
                self.resetModel();
                self.editMode = false;
            }
        }

        public checkRequired(processTypeId: number): boolean {
            const self: Material = this;
            return self.model.processTypeId === processTypeId;
        }
    }
}
