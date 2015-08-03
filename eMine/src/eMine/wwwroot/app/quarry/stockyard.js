'use strict';
angular.module('emine').controller('stockyard', stockyard)
stockyard.$inject = ['$scope', '$window', '$mdDialog', 'quarryService', 'uiGridConstants', 'utility', 'constants'];

function stockyard($scope, $window, $mdDialog, quarryService, uiGridConstants, utility, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'productType', field: 'ProductType', displayName: 'Product Type', type: 'string', enableHiding: false },
                    { name: 'colour', field: 'MaterialColour', type: 'string', displayName: 'Colour', enableHiding: false },
                    { name: 'dimensions', field: 'Dimensions', type: 'string', displayName: 'Dimensions', enableHiding: false },
                    { name: 'materialDate', field: 'MaterialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quarry', field: 'Quarry', type: 'string', displayName: 'Quarry', enableHiding: false },
                    { name: 'materialMovementId', field: 'MaterialMovementId', displayName: '', enableColumnMenu: false, type: 'string', cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.editStock(row.entity, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon></md-button><md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.deleteStock(row.entity, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/delete.svg\"></md-icon></md-button>", cellClass: "text-center", enableHiding: false },
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
        vm.yards = quarryService.yards;
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

    function editStock(row, ev) {

    }

    function deleteStock(row, ev) {

    }

}

