'use strict';
angular.module('emine').controller('stockyard', stockyard)
stockyard.$inject = ['$scope', '$window', '$mdDialog', 'quarryService', 'stockyardDialog', 'uiGridConstants', 'utility', 'constants'];

function stockyard($scope, $window, $mdDialog, quarryService, stockyardDialog, uiGridConstants, utility, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'productType', field: 'productType', displayName: 'Product Type', type: 'string', enableHiding: false },
                    { name: 'colour', field: 'materialColour', type: 'string', displayName: 'Colour', enableHiding: false },
                    { name: 'dimensions', field: 'dimensions', type: 'string', displayName: 'Dimensions', enableHiding: false },
                    { name: 'materialDate', field: 'materialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quarry', field: 'quarry', type: 'string', displayName: 'Quarry', enableHiding: false },
                    { name: 'materialMovementId', field: 'materialMovementId', displayName: '', enableColumnMenu: false, type: 'string', cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.editStock(row.entity, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon></md-button><md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.deleteStock(row.entity, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/delete.svg\"></md-icon></md-button>", cellClass: "text-center", enableHiding: false },
        ]
    };


    var vm = {
        yards: [],
        yardid: 0,
        gridOptions: gridOptions,
        gridHeight: '0px',
        editStock: editStock,
        deleteStock: deleteStock,
        getStock: getStock,
    };

    init();

    return vm;

    function init() {
        quarryService.materialViewModel = undefined; //resetting the view model, so that it can be populated in the edit pop ups
        vm.yards = quarryService.yards;
        quarryService.stock.splice(0, quarryService.stock.length);
        vm.gridOptions.data = quarryService.stock;
        resizeGrid();

        angular.element($window).bind('resize', function () {
            resizeGrid();
        });
        $scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeGrid() {
        vm.gridHeight = utility.getMainGridHeight('main-grid');
    }

    function getStock(form) {
        if (form.$valid) {
            quarryService.getStock(vm.yardId);
        }
    }

    function editStock(model, ev) {
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function deleteStock(model, ev) {
        viewDialog(model, constants.enum.dialogMode.delete, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        model.currentYardId = vm.yardId;
        stockyardDialog.viewDialog(model, dialogMode, ev);
    }

}

