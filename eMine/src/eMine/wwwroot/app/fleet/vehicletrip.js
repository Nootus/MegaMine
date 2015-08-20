'use strict';
angular.module('emine').controller('vehicletrip', vehicletrip)
vehicletrip.$inject = ['vehicleService', 'tripDialog', 'uiGridConstants', 'constants'];

function vehicletrip(vehicleService, tripDialog, uiGridConstants, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [                    
                    { name: 'vehicleTripName', field: 'vehicleTripName', displayName: 'TripName', type: 'string' },
                    { name: 'startingTime', field: 'startingTime', displayName: 'StartingTime', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'reachingTime', field: 'reachingTime', displayName: 'ReachingTime', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'odometerStart', field: 'odometerStart', displayName: 'OdometerStart', type: 'number' },
                    { name: 'odometerEnd', field: 'odometerEnd', displayName: 'OdometerEnd', type: 'number' },

                    {
                        name: 'vehicleTripId', field: 'vehicleTripId', displayName: '', type: 'string', enableColumnMenu: false,
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\" aria-label=\"View\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\" module=\"Fleet\" claim=\"VehicleTripEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\" aria-label=\"Edit\"></md-icon> Edit</em-button>",
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
        vm.vehicleId = vehicleService.vehicle.vehicleId;
        vm.gridOptions.data = vehicleService.tripsList;
    }

    function addTrip(ev)
    {
        var model = { vehicleTripId: 0, vehicleId: vm.vehicleId }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev)
    {
        tripDialog.viewDialog(model, editMode, ev);
    }
}
