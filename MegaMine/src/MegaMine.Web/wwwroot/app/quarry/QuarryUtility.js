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
        let QuarryUtility = class QuarryUtility {
            constructor($filter, quarryService, utility) {
                this.$filter = $filter;
                this.quarryService = quarryService;
                this.utility = utility;
            }
            sortProductTypeByFormula(productTypes) {
                const self = this;
                let sortedProductTypes = self.$filter("orderBy")(productTypes, ["formulaOrder", "productTypeName"]);
                return sortedProductTypes;
            }
            addMaterialWatchers(scope, model) {
                const self = this;
                scope.model = model;
                let allProductTypes = angular.copy(self.quarryService.materialViewModel.productTypes);
                self.quarryService.materialViewModel.productTypes =
                    self.$filter("filter")(allProductTypes, { processTypeId: model.processTypeId });
                let productTypes = self.sortProductTypeByFormula(self.quarryService.materialViewModel.productTypes);
                angular.forEach(productTypes, function (item) {
                    item.formulaJson = JSON.parse(item.formula);
                    let formulaEval = "";
                    angular.forEach(item.formulaJson, function (formulaItem) {
                        if (!self.utility.isEmpty(formulaItem.value)) {
                            formulaEval = formulaEval !== "" ? formulaEval + " && " : formulaEval;
                            formulaEval += "model." + formulaItem.field.toLowerCase() + " " + formulaItem.operand + " " + formulaItem.value;
                        }
                    });
                    if (formulaEval !== "") {
                        item.formulaEval = formulaEval;
                    }
                });
                // bypassing watchers that calculate product type and weight
                model.bypassWeightWatcher = true;
                model.bypassProductTypeWatcher = true;
                scope.$watchGroup(["model.length", "model.width"], function (newValues, oldValues) {
                    // getting the product type
                    if (!self.utility.isEmpty(newValues[0]) && !self.utility.isEmpty(newValues[1]) && !model.bypassProductTypeWatcher) {
                        let productTypeId = undefined;
                        let counter = 0;
                        for (counter = 0; counter < productTypes.length; counter++) {
                            let formulaEval = productTypes[counter].formulaEval;
                            if (formulaEval === undefined) {
                                productTypeId = productTypes[counter].productTypeId;
                                break;
                            }
                            else {
                                if (scope.$eval(formulaEval) === true) {
                                    productTypeId = productTypes[counter].productTypeId;
                                    break;
                                }
                            }
                        }
                        if (productTypeId === undefined) {
                            productTypeId = productTypes[counter - 1].productTypeId;
                        }
                        model.productTypeId = productTypeId;
                    }
                    model.bypassProductTypeWatcher = false;
                });
                scope.$watchGroup(["model.length", "model.width", "model.height"], function (newValues, oldValues) {
                    // calculating weight
                    if (!self.utility.isEmpty(model.length) && !self.utility.isEmpty(model.width)
                        && !self.utility.isEmpty(model.height) && !model.bypassWeightWatcher) {
                        model.weight = Math.round((model.length * model.width * model.height * 2) * 100) / 100;
                    }
                    model.bypassWeightWatcher = false;
                });
                scope.$watch("model.processTypeId", function () {
                    // changing the product types
                    self.quarryService.materialViewModel.productTypes =
                        self.$filter("filter")(allProductTypes, { processTypeId: model.processTypeId });
                    if (model.materialId === 0) {
                        model.productTypeId = undefined;
                    }
                });
            }
            clearByProcessType(model) {
                if (model.processTypeId !== MegaMine.Quarry.Models.ProcessType.Cutting) {
                    model.blockNumber = undefined;
                    model.length = undefined;
                    model.width = undefined;
                    model.height = undefined;
                }
            }
        };
        QuarryUtility = __decorate([
            MegaMine.service("megamine", "MegaMine.Quarry.QuarryUtility"),
            MegaMine.inject("$filter", "MegaMine.Quarry.QuarryService", "MegaMine.Shared.Utility")
        ], QuarryUtility);
        Quarry.QuarryUtility = QuarryUtility;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=QuarryUtility.js.map