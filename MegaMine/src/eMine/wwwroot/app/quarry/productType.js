'use strict';
angular.module('emine').controller('productType', productType)
productType.$inject = ['$scope', 'quarryService', 'productTypeDialog', 'utility'];

function productType($scope, quarryService, productTypeDialog, utility) {

    var gridOptions = {
        columnDefs: [
                    { name: 'productTypeName', field: 'productTypeName', displayName: 'Product Type', type: 'string', enableHiding: false },
                    { name: 'productTypeDescription', field: 'productTypeDescription', type: 'string', displayName: 'Description', enableHiding: false },
                    {
                        name: 'productTypeId', field: 'productTypeId', displayName: '', enableColumnMenu: false, type: 'string',
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\" module=\"Quarry\" claim=\"ProductTypeEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</md-button>",
                        cellClass: "text-center", enableHiding: false
                    },
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
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        productTypeDialog.viewDialog(model, editMode, ev);
    }
}

