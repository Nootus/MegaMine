'use strict';
angular.module('emine').controller('fuel', fuel)
fuel.$inject = ['vehicleService', 'fuelDialog', 'uiGridConstants', 'constants'];

function fuel(vehicleService, fuelDialog, uiGridConstants, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'FuelDate', field: 'FuelDate', displayName: 'Fuel Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'Quantity', field: 'Quantity', displayName: 'Quantity', type: 'number' },
                    { name: 'Odometer', field: 'Odometer', displayName: 'Odometer', type: 'number' },
                    {
                        name: 'VehicleFuelId', field: 'VehicleFuelId', displayName: '', type: 'string',
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\" aria-label=\"View\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\" aria-label=\"Edit\"></md-icon> Edit</md-button>",
                        cellClass: "text-center", enableHiding: false
                    },
        ]
    };

    var vm = {
        vehicleId: 0,
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addFuel: addFuel,
    };

    init();

    return vm;

    function init() {
        vm.vehicleId = vehicleService.vehicle.VehicleId;
        vm.gridOptions.data = vehicleService.fuelList;
    }

    function addFuel(ev) {
        var model = { VehicleFuelId: 0, VehicleId: vm.vehicleId }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        fuelDialog.viewDialog(model, editMode, ev);
    }
}
