module MegaMine.Quarry {

    @controller("megamine", "MegaMine.Quarry.ProductSummary")
    @inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Dialog.DialogService",
        "MegaMine.Shared.Constants", "MegaMine.Shared.Template")
    export class ProductSummary {

        // controller exposed variables
        public quarries: Shared.Models.IListItem<number, string>[] = undefined;
        public selectedQuarries: Shared.Models.IListItem<number, string>[] = [];
        public productTypes: Shared.Models.IListItem<number, string>[] = undefined;
        public selectedProductTypes: Shared.Models.IListItem<number, string>[] = [];
        public colours: Shared.Models.IListItem<number, string>[] = undefined;
        public selectedColours: Shared.Models.IListItem<number, string>[] = [];
        public summary: Models.IProductSummaryModel[] = [];

        public grid: Widget.Models.IDashboardRecordGrid<ProductSummary, Models.IProductSummaryModel>;
        public dialogGrid: Widget.Models.IDashboardRecordGrid<ProductSummary, Models.IStockModel>;
        public searchParams: Models.IProductSummarySearchModel = <Models.IProductSummarySearchModel>{};


        constructor(private quarryService: QuarryService, private dialogService: Shared.Dialog.DialogService<Models.IStockModel[]>,
            private constants: Shared.Constants, private template: Shared.Template) {
            const self: ProductSummary = this;

            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "productTypeName", field: "productTypeName", displayName: "Product Type", type: "string" },
                    { name: "quarryName", field: "quarryName", displayName: "Quarry Name", type: "string" },
                    { name: "colourName", field: "colourName", displayName: "Colour", type: "string" },
                    {
                        name: "materialQuantityWeight", field: "materialQuantityWeight", type: "int",
                        displayName: "Quantity/Weight", cellClass: "grid-text-right"
                    },
                    , template.getButtonColumnDefs("rowId", [{
                        buttonType: Shared.Models.ButtonType.view,
                        claim: undefined, ngClick: "grid.appScope.grid.context.showSummaryDetails(row.entity, $event)"
                    }])
                ]
            };

            const dialogGridOptions: uiGrid.IGridOptions = {
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
                        cellFilter: "date:\"" + constants.dateFormat + "\"", cellClass: "grid-text-right"
                    },
                    { name: "quarry", field: "quarry", type: "string", displayName: "Quarry" }
                ]
            };


            self.grid = {
                options: gridOptions,
                data: quarryService.productSummary,
                context: self
            };
            self.dialogGrid = {
                options: dialogGridOptions,
                data: undefined,
                context: self
            };

            self.initialize();
        }



        private initialize(): void {
            const self: ProductSummary = this;
            self.quarries = self.quarryService.productSummaryVM.quarries;
            self.productTypes = self.quarryService.productSummaryVM.productTypes;
            self.colours = self.quarryService.productSummaryVM.colours;
        }

        public getSummary(form: ng.IFormController): void {
            const self: ProductSummary = this;
            if (form.$valid) {
                // populating the search params
                self.searchParams.quarryIds = [];
                angular.forEach(self.selectedQuarries, function (item: Shared.Models.IListItem<number, string>): void {
                    self.searchParams.quarryIds.push(item.key);
                });
                self.searchParams.productTypeIds = [];
                angular.forEach(self.selectedProductTypes, function (item: Shared.Models.IListItem<number, string>): void {
                    self.searchParams.productTypeIds.push(item.key);
                });
                self.searchParams.materialColourIds = [];
                angular.forEach(self.selectedColours, function (item: Shared.Models.IListItem<number, string>): void {
                    self.searchParams.materialColourIds.push(item.key);
                });
                self.quarryService.productSummarySearch(self.searchParams);
            }
        }

        public dialogInit(dialogController: Shared.Dialog.DialogController<Models.IStockModel[]>, dialogModel: Models.IStockModel[]): void {
            dialogController.dataOptions.dialogGrid.data = dialogModel;
        }

        public showSummaryDetails(summaryModel: Models.IProductSummaryModel, ev: ng.IAngularEvent): void {
            const self: ProductSummary = this;
            self.searchParams.quarryIds = [summaryModel.quarryId];
            self.searchParams.productTypeIds = [summaryModel.productTypeId];
            self.searchParams.materialColourIds = [summaryModel.materialColourId];
            self.dialogService.show({
                templateUrl: "product_summary_dialog",
                targetEvent: ev,
                data: {
                    model: self.quarryService.productSummaryDetails,
                    dataOptions: { summaryModel: summaryModel, dialogGrid: self.dialogGrid }
                },
                dialogMode: Shared.Dialog.Models.DialogMode.view,
                dialogInit: self.dialogInit,
                resolve: {
                    resolvemodel: function (): ng.IHttpPromise<Models.IStockModel[]> {
                        return self.quarryService.getProductSummaryDetails(self.searchParams);
                    }
                }
            });
        }
    }
}