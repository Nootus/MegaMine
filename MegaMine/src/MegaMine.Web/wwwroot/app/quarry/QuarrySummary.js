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
        let QuarrySummary = class QuarrySummary {
            constructor(quarryService, quarryUtility, dialogService, constants, template) {
                this.quarryService = quarryService;
                this.quarryUtility = quarryUtility;
                this.dialogService = dialogService;
                this.constants = constants;
                this.template = template;
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: "QuarryName", field: "QuarryName", displayName: "Quarry Name", type: "string" },
                        { name: "Colour", field: "Colours", type: "string", displayName: "Colour" }
                    ]
                };
                var dialogGridOptions = {
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
            initialize() {
                const self = this;
                let productTypes = self.quarryUtility.sortProductTypeByFormula(self.quarryService.productTypeList);
                angular.forEach(productTypes, function (item) {
                    if (item.processTypeId === Quarry.Models.ProcessType.Cutting) {
                        self.grid.options.columnDefs.push({
                            name: item.productTypeName, field: item.productTypeName, type: "number",
                            displayName: item.productTypeName, cellClass: "grid-text-right"
                        });
                    }
                });
                self.grid.options.columnDefs.push({
                    name: "TotalQuantity", field: "TotalQuantity", type: "number", displayName: "Total Quantity",
                    cellClass: "grid-text-right"
                });
                angular.forEach(productTypes, function (item) {
                    if (item.processTypeId === Quarry.Models.ProcessType.Crushing) {
                        self.grid.options.columnDefs.push({
                            name: item.productTypeName, field: item.productTypeName, type: "number",
                            displayName: item.productTypeName, cellClass: "grid-text-right"
                        });
                    }
                });
                self.grid.options.columnDefs.push({ name: "TotalWeight", field: "TotalWeight", type: "number", displayName: "Total Weight", cellClass: "grid-text-right" });
                self.grid.options.columnDefs.push(self.template.getButtonColumnDefs("QuarryId", [{
                        buttonType: 0 /* view */, claim: undefined,
                        ngClick: "grid.appScope.grid.context.showQuarrySummaryDetails(row.entity, $event)"
                    }]));
            }
            getQuarrySummary(form) {
                const self = this;
                if (form.$valid) {
                    self.quarryService.quarrySummaryGet(self.searchParams);
                }
            }
            dialogInit(dialogController, dialogModel) {
                dialogController.dataOptions.dialogGrid.data = dialogModel;
            }
            showQuarrySummaryDetails(quarry, ev) {
                const self = this;
                self.searchParams.quarryId = quarry.QuarryId;
                self.dialogService.show({
                    templateUrl: "quarry_summary_dialog",
                    targetEvent: ev,
                    data: {
                        model: self.quarryService.quarrySummaryDetails,
                        dataOptions: { quarryModel: quarry, dialogGrid: self.dialogGrid }
                    },
                    dialogMode: 0 /* view */,
                    dialogInit: self.dialogInit,
                    resolve: {
                        resolvemodel: function () {
                            return self.quarryService.getQuarrySummaryDetails(self.searchParams);
                        }
                    }
                });
            }
        };
        QuarrySummary = __decorate([
            MegaMine.controller("megamine", "MegaMine.Quarry.QuarrySummary"),
            MegaMine.inject("MegaMine.Quarry.QuarryService", "MegaMine.Quarry.QuarryUtility", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Constants", "MegaMine.Shared.Template")
        ], QuarrySummary);
        Quarry.QuarrySummary = QuarrySummary;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=QuarrySummary.js.map