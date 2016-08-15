module MegaMine.Quarry {

    @controller("megamine", "MegaMine.Quarry.QuarrySummary")
    @inject("MegaMine.Quarry.QuarryService", "MegaMine.Quarry.QuarryUtility", "MegaMine.Shared.Dialog.DialogService",
        "MegaMine.Shared.Constants", "MegaMine.Shared.Template")
    export class QuarrySummary {

        public grid: Widget.Models.IDashboardRecordGrid<QuarrySummary, Models.IQuarrySummaryModel>;
        public dialogGrid: Widget.Models.IDashboardRecordGrid<QuarrySummary, Models.IStockModel>;
        public searchParams: Models.IQuarrySummarySearchModel;

        constructor(private quarryService: QuarryService, private quarryUtility: QuarryUtility,
            private dialogService: Shared.Dialog.DialogService<Models.IStockModel[]>, private constants: Shared.Constants,
            private template: Shared.Template) {

            const self: QuarrySummary = this;

            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "QuarryName", field: "QuarryName", displayName: "Quarry Name", type: "string" },
                    { name: "Colour", field: "Colours", type: "string", displayName: "Colour" }
                ]
            };

            var dialogGridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "blockNumber", field: "blockNumber", displayName: "Block Number", type: "string" },
                    { name: "productType", field: "productType", displayName: "Product Type", type: "string" },
                    { name: "colour", field: "materialColour", type: "string", displayName: "Colour" },
                    { name: "length", field: "length", type: "number", displayName: "Length", cellClass: "grid-text-right" },
                    { name: "width", field: "width", type: "number", displayName: "Width", cellClass: "grid-text-right" },
                    { name: "height", field: "height", type: "number", displayName: "Height", cellClass: "grid-text-right" },
                    { name: "weight", field: "weight", type: "number", displayName: "Weight", cellClass: "grid-text-right" },
                    {
                        name: "materialDate", field: "materialDate", displayName: "Date", type: "date",
                        cellFilter: "date:\"" + constants.dateFormat + "\""
                    },
                    { name: "quarry", field: "quarry", type: "string", displayName: "Quarry" }
                ]
            };

            self.grid = {
                options: gridOptions,
                data: quarryService.quarrySummary,
                context: self
            };
            self.dialogGrid = {
                options: dialogGridOptions,
                data: undefined,
                context: self
            };

            self.searchParams = { startDate: undefined, endDate: undefined, quarryId: 0 };

            self.initialize();
        }

        private initialize(): void {
            const self: QuarrySummary = this;

            let productTypes: Models.IProductTypeModel[] = self.quarryUtility.sortProductTypeByFormula(self.quarryService.productTypeList);
            angular.forEach(productTypes, function (item: Models.IProductTypeModel): void {
                if (item.processTypeId === Models.ProcessType.Cutting) {
                    self.grid.options.columnDefs.push(
                        {
                            name: item.productTypeName, field: item.productTypeName, type: "number",
                            displayName: item.productTypeName, cellClass: "grid-text-right"
                        }
                    );
                }
            });
            self.grid.options.columnDefs.push(
                {
                    name: "TotalQuantity", field: "TotalQuantity", type: "number", displayName: "Total Quantity",
                    cellClass: "grid-text-right"
                }
            );

            angular.forEach(productTypes, function (item: Models.IProductTypeModel): void {
                if (item.processTypeId === Models.ProcessType.Crushing) {
                    self.grid.options.columnDefs.push(
                        {
                            name: item.productTypeName, field: item.productTypeName, type: "number",
                            displayName: item.productTypeName, cellClass: "grid-text-right"
                        }
                    );
                }
            });
            self.grid.options.columnDefs.push(
                { name: "TotalWeight", field: "TotalWeight", type: "number", displayName: "Total Weight", cellClass: "grid-text-right" }
            );
            self.grid.options.columnDefs.push(self.template.getButtonColumnDefs("QuarryId",
                [{
                    buttonType: Shared.Models.ButtonType.view, claim: undefined,
                    ngClick: "grid.appScope.grid.context.showQuarrySummaryDetails(row.entity, $event)"
                }]));
        }

        public getQuarrySummary(form: ng.IFormController): void {
            const self: QuarrySummary = this;
            if (form.$valid) {
                self.quarryService.quarrySummaryGet(self.searchParams);
            }
        }

        public dialogInit(dialogController: Shared.Dialog.DialogController<Models.IStockModel[]>, dialogModel: Models.IStockModel[]): void {
            dialogController.dataOptions.dialogGrid.data = dialogModel;
        }

        public showQuarrySummaryDetails(quarry: Models.IQuarrySummaryModel, ev: ng.IAngularEvent): void {
            const self: QuarrySummary = this;

            self.searchParams.quarryId = quarry.QuarryId;

            self.dialogService.show({
                templateUrl: "quarry_summary_dialog",
                targetEvent: ev,
                data: { model: self.quarryService.quarrySummaryDetails, dataOptions: { quarryModel: quarry, dialogGrid: self.dialogGrid } },
                dialogMode: Shared.Dialog.Models.DialogMode.view,
                dialogInit: self.dialogInit,
                resolve: {
                    resolvemodel: function (): ng.IHttpPromise<Models.IStockModel[]> {
                        return self.quarryService.getQuarrySummaryDetails(self.searchParams);
                    }
                }
            });
        }
    }
}

