module MegaMine.Quarry {

    @service("megamine", "MegaMine.Quarry.QuarryUtility")
    @inject("$filter", "MegaMine.Quarry.QuarryService", "MegaMine.Shared.Utility")
    export class QuarryUtility {

        constructor(private $filter: ng.IFilterService, private quarryService, private utility: Shared.Utility) {
        }

        public sortProductTypeByFormula(productTypes: Models.IProductTypeModel[]): Models.IProductTypeModel[] {
            const self: QuarryUtility = this;
            let sortedProductTypes: Models.IProductTypeModel[] = self.$filter("orderBy")(productTypes, ["formulaOrder", "productTypeName"]);
            return sortedProductTypes;
        }

        public addMaterialWatchers(scope, model) {
            const self: QuarryUtility = this;


            scope.model = model;
            let allProductTypes: Models.IProductTypeModel[] = angular.copy(self.quarryService.materialViewModel.productTypes);

            self.quarryService.materialViewModel.productTypes = self.$filter('filter')(allProductTypes, { processTypeId: model.processTypeId });
            let productTypes: Models.IProductTypeModel[] = self.sortProductTypeByFormula(self.quarryService.materialViewModel.productTypes);
            angular.forEach(productTypes, function (item: Models.IProductTypeModel) {
                item.formulaJson = JSON.parse(item.formula);
                let formulaEval: string = "";
                angular.forEach(item.formulaJson, function (formulaItem: Models.IProductTypeFormulaModel): void {
                    if (!self.utility.isEmpty(formulaItem.value)) {
                        formulaEval = formulaEval !== '' ? formulaEval + ' && ' : formulaEval;
                        formulaEval += 'model.' + formulaItem.field.toLowerCase() + ' ' + formulaItem.operand + ' ' + formulaItem.value;
                    }
                });
                if (formulaEval !== '') {
                    item.formulaEval = formulaEval;
                }
            });

            //bypassing watchers that calculate product type and weight
            model.bypassWeightWatcher = true;
            model.bypassProductTypeWatcher = true;

            scope.$watchGroup(['model.length', 'model.width'], function (newValues: number[], oldValues: number[]) {
                //getting the product type
                if (!self.utility.isEmpty(newValues[0]) && !self.utility.isEmpty(newValues[1]) && !model.bypassProductTypeWatcher) {
                    var productTypeId = undefined;
                    for (var counter = 0; counter < productTypes.length; counter++) {
                        var formulaEval = productTypes[counter].formulaEval;
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
            scope.$watchGroup(['model.length', 'model.width', 'model.height'], function (newValues, oldValues) {
                //calculating weight
                if (!self.utility.isEmpty(model.length) && !self.utility.isEmpty(model.width) && !self.utility.isEmpty(model.height) && !model.bypassWeightWatcher) {
                    model.weight = Math.round((model.length * model.width * model.height * 2) * 100) / 100;
                }
                model.bypassWeightWatcher = false;
            });
            scope.$watch('model.processTypeId', function () {
                //changing the product types
                self.quarryService.materialViewModel.productTypes = self.$filter('filter')(allProductTypes, { processTypeId: model.processTypeId });
                if (model.materialId === 0)
                    model.productTypeId = undefined;
            });
        }

        public clearByProcessType(model) {
            if (model.processTypeId != MegaMine.Quarry.Models.ProcessType.Cutting) {
                model.blockNumber = undefined;
                model.length = "";
                model.width = "";
                model.height = "";
            }
        }
    }
}