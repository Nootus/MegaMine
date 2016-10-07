var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Quarry;
    (function (Quarry) {
        let ProductSummary = class ProductSummary {
            constructor(quarryService, dialogService, constants, template) {
                this.quarryService = quarryService;
                this.dialogService = dialogService;
                this.constants = constants;
                this.template = template;
                // controller exposed variables
                this.quarries = undefined;
                this.selectedQuarries = [];
                this.productTypes = undefined;
                this.selectedProductTypes = [];
                this.colours = undefined;
                this.selectedColours = [];
                this.summary = [];
                this.searchParams = {};
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: "productTypeName", field: "productTypeName", displayName: "Product Type", type: "string" },
                        { name: "quarryName", field: "quarryName", displayName: "Quarry Name", type: "string" },
                        { name: "colourName", field: "colourName", displayName: "Colour", type: "string" },
                        {
                            name: "materialQuantityWeight", field: "materialQuantityWeight", type: "int",
                            displayName: "Quantity/Weight", cellClass: "grid-text-right"
                        },
                        ,
                        template.getButtonColumnDefs("rowId", [{
                                buttonType: 0 /* view */,
                                claim: undefined, ngClick: "grid.appScope.grid.context.showSummaryDetails(row.entity, $event)"
                            }])
                    ]
                };
                const dialogGridOptions = {
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
            initialize() {
                const self = this;
                self.quarries = self.quarryService.productSummaryVM.quarries;
                self.productTypes = self.quarryService.productSummaryVM.productTypes;
                self.colours = self.quarryService.productSummaryVM.colours;
            }
            getSummary(form) {
                const self = this;
                if (form.$valid) {
                    // populating the search params
                    self.searchParams.quarryIds = [];
                    angular.forEach(self.selectedQuarries, function (item) {
                        self.searchParams.quarryIds.push(item.key);
                    });
                    self.searchParams.productTypeIds = [];
                    angular.forEach(self.selectedProductTypes, function (item) {
                        self.searchParams.productTypeIds.push(item.key);
                    });
                    self.searchParams.materialColourIds = [];
                    angular.forEach(self.selectedColours, function (item) {
                        self.searchParams.materialColourIds.push(item.key);
                    });
                    self.quarryService.productSummarySearch(self.searchParams);
                }
            }
            dialogInit(dialogController, dialogModel) {
                dialogController.dataOptions.dialogGrid.data = dialogModel;
            }
            showSummaryDetails(summaryModel, ev) {
                const self = this;
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
                    dialogMode: 0 /* view */,
                    dialogInit: self.dialogInit,
                    resolve: {
                        resolvemodel: function () {
                            return self.quarryService.getProductSummaryDetails(self.searchParams);
                        }
                    }
                });
            }
        };
        ProductSummary = __decorate([
            MegaMine.controller("megamine", "MegaMine.Quarry.ProductSummary"),
            MegaMine.inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Constants", "MegaMine.Shared.Template")
        ], ProductSummary);
        Quarry.ProductSummary = ProductSummary;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=ProductSummary.js.map