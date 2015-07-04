'use strict';
angular.module('emine').controller('sparePart', sparePart)
sparePart.$inject = ['$scope', '$window', '$mdDialog', 'vehicleService', 'sparePartOrderDialog', 'sparePartDialog', 'utility', 'uiGridConstants', 'constants'];

function sparePart($scope, $window, $mdDialog, vehicleService, sparePartOrderDialog, sparePartDialog, utility, uiGridConstants, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'OrderedUTCdatetime', field: 'OrderedUTCdatetime', displayName: 'Ordered Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'OrderedUnits', field: 'OrderedUnits', displayName: 'Quantity', type: 'number' },
                    { name: 'ConsumedUnits', field: 'ConsumedUnits', displayName: 'ConsumedUnits', type: 'number' },
                    { name: 'UnitCost', field: 'UnitCost', displayName: 'Unit Cost', type: 'number' },
                    {
                        name: 'SparePartOrderId', field: 'SparePartOrderId', enableColumnMenu: false, displayName: '', type: 'string',
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewOrder(row.entity, false, $event)\" aria-label=\"View\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewOrder(row.entity, true, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\" aria-label=\"Edit\"></md-icon> Edit</md-button>",
                        cellClass: "text-center", enableHiding: false
                    },
        ]
    };

    var vm = {
        model: {},
        gridOptions: gridOptions,
        viewOrder: viewOrder,
        addOrder: addOrder,
        editSparePart: editSparePart,
        gridHeight: '0px',
    };

    init();

    return vm;

    function init() {
        vm.model = vehicleService.sparePart;
        vm.gridOptions.data = vehicleService.ordersList;
        resizeGrid();

        angular.element($window).bind('resize', function () {
            resizeGrid();
        });
        $scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeGrid() {
        vm.gridHeight = utility.getSubGridHeight('sub-grid');
    }

    function addOrder(ev)
    {
        vm.model.SparePartOrderId = 0;
        sparePartOrderDialog.viewDialog(vm.model, true, ev);
    }

    function viewOrder(model, editMode, ev) {
        sparePartOrderDialog.viewDialog(model, editMode, ev);
    }

    function editSparePart(ev) {
        sparePartDialog.viewDialog(vm.model.SparePartId, ev);
    }
}
