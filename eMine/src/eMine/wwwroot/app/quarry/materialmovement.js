'use strict';
angular.module('emine').controller('materialmovement', materialmovement)
materialmovement.$inject = ['$scope', '$window', '$filter', '$mdDialog', 'quarryService', 'uiGridConstants', 'utility', 'constants'];

function materialmovement($scope, $window, $filter, $mdDialog, quarryService, uiGridConstants, utility, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'materialMovementId', field: 'MaterialMovementId', displayName: '', enableColumnMenu: false, type: 'string', cellTemplate: "<md-checkbox ng-model=\"row.entity.Selected\" aria-label=\"{{row.entity.MaterialMovementId}}\" class=\"md-primary\"></md-checkbox>", cellClass: "text-center", enableHiding: false },
                    { name: 'productType', field: 'ProductType', displayName: 'Product Type', type: 'string', enableHiding: false },
                    { name: 'colour', field: 'MaterialColour', type: 'string', displayName: 'Colour', enableHiding: false },
                    { name: 'dimensions', field: 'Dimensions', type: 'string', displayName: 'Dimensions', enableHiding: false },
                    { name: 'materialDate', field: 'MaterialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quarry', field: 'Quarry', type: 'string', displayName: 'Quarry', enableHiding: false }
        ]
    };


    var vm = {
        yards: [],
        fromYardid: undefined,
        toYardid: undefined,
        gridOptions: gridOptions,
        gridHeight: '0px',
        getStock: getStock,
        moveMaterial: moveMaterial
    };

    init();

    return vm;

    function init() {
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
            quarryService.getStock(vm.fromYardid);
        }
    }

    function moveMaterial(ev) {
        var selectedIds = [];
        angular.forEach(quarryService.stock, function (item) {
            if (item.Selected === true) {
                selectedIds.push(item.MaterialMovementId)
            }
        });
    }
}

