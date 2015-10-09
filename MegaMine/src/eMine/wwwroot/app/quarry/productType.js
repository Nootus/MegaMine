'use strict';
angular.module('emine').controller('productType', productType)
productType.$inject = ['$scope', 'quarryService', 'gridUtility', 'constants', 'dialogService', 'template'];

function productType($scope, quarryService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'productTypeName', field: 'productTypeName', displayName: 'Product Type', type: 'string', enableHiding: false },
                    { name: 'productTypeDescription', field: 'productTypeDescription', type: 'string', displayName: 'Description', enableHiding: false },
                    { name: 'formulaString', field: 'formulaString', type: 'string', displayName: 'Formula', enableHiding: false },
                    { name: 'formulaOrder', field: 'formulaOrder', type: 'string', displayName: 'Formula Order', enableHiding: false },
                    template.getButtonDefaultColumnDefs('productTypeId', 'Quarry', 'ProductTypeEdit')
                ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addProductType: addProductType
    };

    init();

    return vm;

    function init() {
        angular.forEach(quarryService.productTypes, function (item) {
            item.formulaJson = JSON.parse(item.formula);
            item.formulaString = getFormulaString(item.formulaJson);
            if (item.formulaJson === null) {
                item.formulaJson = [];
                item.formulaJson.push({ field: 'Height' });
                item.formulaJson.push({ field: 'Weight' });
            }
        });
        gridUtility.initializeGrid(vm, $scope, quarryService.productTypes);
    }

    function getFormulaString(formulaJson) {
        var formulaString = '';
        angular.forEach(formulaJson, function (jsonItem) {
            if (valueExists(jsonItem.value)) {
                if (formulaString !== '') {
                    formulaString += " & ";
                }
                formulaString += jsonItem.field + ' ' + jsonItem.operand + ' ' + jsonItem.value;
            }
        });
        return formulaString;
    }

    function valueExists(value) {
        if (value !== '' && value !== null && value !== undefined)
            return true;
        else
            return false;
    }

    function addProductType(ev) {
        var model = { productTypeId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        model.orderErrorMessages = [{ type: 'orderRequired', text: 'Required!', }];

        dialogService.show({
            templateUrl: 'product_type_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode,
            returnForm: true
        })
        .then(function (response) {
            var dialogModel = response.dialogModel;
            var form = response.form;
            dialogModel.formula = JSON.stringify(dialogModel.formulaJson);
            var formulaExists = false;
            angular.forEach(dialogModel.formulaJson, function (item) {
                if (valueExists(item.value)) {
                    formulaExists = true;
                }
            });
            if (formulaExists && (dialogModel.formulaOrder === null || dialogModel.formulaOrder === undefined)) {
                form.formulaOrder.$setValidity('orderRequired', false)
                return;
            }
            
            quarryService.saveProductType(dialogModel).then(function () {
                //update the grid values
                if (dialogModel.productTypeId === 0) {
                    quarryService.getProductTypes();
                }
                else {
                    model.productTypeName = dialogModel.productTypeName
                    model.productTypeDescription = dialogModel.productTypeDescription
                    model.formulaString = getFormulaString(dialogModel.formulaJson);
                    model.formulaOrder = dialogModel.formulaOrder
                }

                dialogService.hide();
            });
        });
    }
}

