'use strict';
angular.module('emine').controller('vehicletrip', vehicletrip)
vehicletrip.$inject = ['vehicleService', 'tripDialog', 'uiGridConstants', 'constants'];

function vehicletrip(vehicleService, tripDialog, uiGridConstants, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [                    
                    { name: 'VehicleTripName', field: 'VehicleTripName', displayName: 'TripName', type: 'string' },
                    { name: 'StartingTime', field: 'StartingTime', displayName: 'StartingTime', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'ReachingTime', field: 'ReachingTime', displayName: 'ReachingTime', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'OdometerStart', field: 'OdometerStart', displayName: 'OdometerStart', type: 'number' },
                    { name: 'OdometerEnd', field: 'OdometerEnd', displayName: 'OdometerEnd', type: 'number' },

                    {
                        name: 'VehicleTripId', field: 'VehicleTripId', displayName: '', type: 'string', enableColumnMenu: false,
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\" aria-label=\"View\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\" aria-label=\"Edit\"></md-icon> Edit</md-button>",
                        cellClass: "text-center", enableHiding: false
                    },
        ]
    };

    var vm = {
        vehicleId: 0,
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addTrip: addTrip,
    };

    init();

    return vm;

    function init()
    {
        vm.vehicleId = vehicleService.vehicle.VehicleId;
        vm.gridOptions.data = vehicleService.tripsList;
    }

    function addTrip(ev)
    {
        var model = { VehicleTripId: 0, VehicleId: vm.vehicleId }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev)
    {
        tripDialog.viewDialog(model, editMode, ev);
    }
}
