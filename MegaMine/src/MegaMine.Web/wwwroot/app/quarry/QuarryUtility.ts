module MegaMine.Quarry {

    @service("megamine", "MegaMine.Quarry.QuarryUtility")
    @inject("$filter", "quarryService", "MegaMine.Shared.Utility")
    export class QuarryUtility {

        constructor(private $filter: ng.IFilterService, private quarryService, private utility: Shared.Utility) {
        }

        public sortProductTypeByFormula(productTypes) {
            const self: QuarryUtility = this;
        let sortedProductTypes = self.$filter("orderBy")(productTypes, ["formulaOrder", "productTypeName"]);
        return sortedProductTypes;
    }

    public addMaterialWatchers(scope, model) {
        scope.model = model;
        var allProductTypes = angular.copy(quarryService.materialViewModel.productTypes);

        quarryService.materialViewModel.productTypes = $filter('filter')(allProductTypes, { processTypeId: model.processTypeId });
        var productTypes = sortProductTypeByFormula(quarryService.materialViewModel.productTypes);
        angular.forEach(productTypes, function (item) {
            item.formulaJson = JSON.parse(item.formula);
            var formulaEval = '';
            angular.forEach(item.formulaJson, function (formulaItem) {
                if (!utility.isEmpty(formulaItem.value)) {
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

        scope.$watchGroup(['model.length', 'model.width'], function (newValues, oldValues) {
            //getting the product type
            if (!utility.isEmpty(newValues[0]) && !utility.isEmpty(newValues[1]) && !model.bypassProductTypeWatcher) {
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
            if (!utility.isEmpty(model.length) && !utility.isEmpty(model.width) && !utility.isEmpty(model.height) && !model.bypassWeightWatcher) {
                model.weight = Math.round((model.length * model.width * model.height * 2) * 100) / 100;
            }
            model.bypassWeightWatcher = false;
        });
        scope.$watch('model.processTypeId', function () {
            //changing the product types
            quarryService.materialViewModel.productTypes = $filter('filter')(allProductTypes, { processTypeId: model.processTypeId });
            if(model.materialId === 0)
                model.productTypeId = undefined;
        });
    }

    public clearByProcessType(model) {
        if (model.processTypeId != MegaMine.Quarry.ProcessType.Cutting) {
            model.blockNumber = undefined;
            model.length = "";
            model.width = "";
            model.height = "";
        }
    }

}