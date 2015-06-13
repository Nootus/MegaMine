'use strict';
angular.module('emine').controller('sparePart', sparePart)
sparePart.$inject = ['$scope', '$mdDialog', 'vehicleService', 'sparePartOrderDialog', 'sparePartDialog', 'uiGridConstants'];

function sparePart($scope, $mdDialog, vehicleService, sparePartOrderDialog, sparePartDialog, uiGridConstants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'OrderedUTCdatetime', field: 'OrderedUTCdatetime', displayName: 'Ordered Date', cellFilter: 'date:"dd/MM/yyyy"' },
                    { name: 'OrderedUnits', field: 'OrderedUnits', displayName: 'Quantity' },
                    { name: 'UnitCost', field: 'UnitCost', displayName: 'Unit Cost' },
                    {
                        name: 'SparePartOrderId', field: 'SparePartOrderId', displayName: '',
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
        editSparePart: editSparePart
    };

    init();

    return vm;

    function init() {
        vm.model = vehicleService.sparePart;
        vm.gridOptions.data = vm.model.Orders;
    }

    function addOrder(ev) {
        vehicleServiceDialog.viewDialog(0, true, ev);
    }

    function viewOrder(model, editMode, ev) {
        sparePartOrderDialog.viewDialog(model, editMode, ev);
    }

    function editSparePart(ev) {
        sparePartDialog.viewDialog(vm.model.SparePartId, ev);
    }
}
