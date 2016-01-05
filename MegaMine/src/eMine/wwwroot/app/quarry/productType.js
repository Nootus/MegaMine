'use strict';
angular.module('megamine').controller('productType', productType)
productType.$inject = ['$scope', 'quarryService', 'gridUtility', 'utility', 'constants', 'dialogService', 'template', 'message'];

function productType($scope, quarryService, gridUtility, utility, constants, dialogService, template, message) {

    var gridOptions = {
        columnDefs: [
                    { name: 'productTypeName', field: 'productTypeName', displayName: 'Product Type', type: 'string' },
                    { name: 'productTypeDescription', field: 'productTypeDescription', type: 'string', displayName: 'Description' },
                    { name: 'formulaString', field: 'formulaString', type: 'string', displayName: 'Formula' },
                    { name: 'formulaOrder', field: 'formulaOrder', type: 'string', displayName: 'Formula Order' },
                    template.getButtonDefaultColumnDefs('productTypeId', 'Quarry', 'ProductTypeEdit')
                ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addProductType: addProductType,
        validateFormulaOrder: validateFormulaOrder
    };

    init();

    return vm;

    function init() {
        angular.forEach(quarryService.productTypes, function (item) {
            initializeModel(item);
        });
        gridUtility.initializeGrid(vm.gridOptions, $scope, quarryService.productTypes);
    }

    function initializeModel(model) {
        if (model.formula === undefined)
            model.formula = null;

        model.formulaJson = JSON.parse(model.formula);
        model.formulaString = getFormulaString(model.formulaJson);
        if (model.formulaJson === null) {
            model.formulaJson = [];
            model.formulaJson.push({ field: 'Length', operand: '>=' });
            model.formulaJson.push({ field: 'Width', operand: '<=' });
        }

        return model;
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

    function validateFormulaOrder(form) {
        if (form !== undefined) {
            var counter = 0;
            var controlName = '';
            var formulaExists = false;
            while (true) {
                controlName = "formulaValue_" + counter;
                if (form[controlName] === undefined)
                    break;
                if (!utility.isEmpty(form[controlName].$modelValue)) {
                    formulaExists = true;
                    break;
                }
                counter++;
            }
            
            if (formulaExists && utility.isEmpty(form.formulaOrder.$modelValue)) {
                form.formulaOrder.$setValidity('orderRequired', false)
            }
            else {
                form.formulaOrder.$setValidity('orderRequired', true)
            }
        }
    }

    function addProductType(ev) {
        var model = initializeModel({ productTypeId: 0 });
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        var validator = {
            orderErrorMessages: [{ type: 'orderRequired', text: message.required }],
            validateFormulaOrder: validateFormulaOrder
        }

        var disabled = dialogMode !== constants.enum.dialogMode.save

        dialogService.show({
            templateUrl: 'product_type_dialog',
            targetEvent: ev,
            data: { model: model, validator: validator, disabled: disabled },
            dialogMode: dialogMode,
            returnForm: true,
            parentVm: vm
        })
        .then(function (response) {
            var dialogModel = response.dialogModel;
            var form = response.form;
            dialogModel.formula = JSON.stringify(dialogModel.formulaJson);
            
            quarryService.saveProductType(dialogModel).then(function () {
                //update the grid values
                if (dialogModel.productTypeId === 0) {
                    quarryService.getProductTypes().then(function () {
                        angular.forEach(quarryService.productTypes, function (item) {
                            initializeModel(item);
                        });
                    });
                }
                else {
                    model.productTypeName = dialogModel.productTypeName
                    model.productTypeDescription = dialogModel.productTypeDescription
                    model.formulaString = getFormulaString(dialogModel.formulaJson);
                    model.formula = JSON.stringify(dialogModel.formulaJson);
                    model.formulaJson = angular.copy(dialogModel.formulaJson);
                    model.formulaOrder = dialogModel.formulaOrder
                }

                dialogService.hide();
            });
        });
    }
}

