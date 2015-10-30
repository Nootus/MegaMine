'use strict';
angular.module('emine').controller('vehicleTrip', vehicleTrip)
vehicleTrip.$inject = ['$scope', 'vehicleService', 'gridUtility', 'constants', 'dialogService', 'template'];

function vehicleTrip($scope, vehicleService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [                    
                    { name: 'vehicleTripName', field: 'vehicleTripName', displayName: 'TripName', type: 'string' },
                    { name: 'startingTime', field: 'startingTime', displayName: 'Start', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'reachingTime', field: 'reachingTime', displayName: 'End', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'odometerStart', field: 'odometerStart', displayName: 'Odometer Start', type: 'number' },
                    { name: 'odometerEnd', field: 'odometerEnd', displayName: 'Odometer End', type: 'number' },
                    template.getButtonDefaultColumnDefs('vehicleTripId', 'Fleet', 'VehicleTripEdit')
                    ]
        };

    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addTrip: addTrip,
    };

    init();

    return vm;

    function init()
    {
        gridUtility.initializeSubGrid(vm.gridOptions, $scope, vehicleService.tripsList);
    }

    function addTrip(ev)
    {
        var model = { vehicleTripId: 0, vehicleId: vehicleService.vehicle.vehicleId }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'vehicle_trip_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            vehicleService.saveTrip(dialogModel).then(function () {
                //update the grid values
                if (dialogModel.vehicleTripId === 0) {
                    vehicleService.getTripList(dialogModel.vehicleId);
                }
                else {
                    model.vehicleTripName = dialogModel.vehicleTripName
                    model.startingTime = dialogModel.startingTime
                    model.reachingTime = dialogModel.reachingTime
                    model.odometerStart = dialogModel.odometerStart
                    model.odometerEnd = dialogModel.odometerEnd
                }

                dialogService.hide();
            });
        });
    }
}
