'use strict';
angular.module('emine').controller('productType', productType)
productType.$inject = ['$scope', 'quarryService', 'utility', 'constants', 'dialogService', 'template'];

function productType($scope, quarryService, utility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'productTypeName', field: 'productTypeName', displayName: 'Product Type', type: 'string', enableHiding: false },
                    { name: 'productTypeDescription', field: 'productTypeDescription', type: 'string', displayName: 'Description', enableHiding: false },
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
        utility.initializeGrid(vm, $scope, quarryService.productTypes);
    }

    function addProductType(ev) {
        var model = { productTypeId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'product_type_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            quarryService.saveProductType(dialogModel).success(function () {
                //update the grid values
                if (dialogModel.productTypeId === 0) {
                    quarryService.getProductTypes();
                }
                else {
                    model.productTypeName = dialogModel.productTypeName
                    model.productTypeDescription = dialogModel.productTypeDescription
                }

                dialogService.hide();
            });
        });
    }
}

