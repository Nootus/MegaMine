'use strict';
angular.module('megamine').controller('vehicleTrip', vehicleTrip)
vehicleTrip.$inject = ['$scope', 'vehicleService', "MegaMine.Shared.GridUtility", "MegaMine.Shared.Constants", "MegaMine.Shared.DialogService", "MegaMine.Shared.Template", "MegaMine.Shared.Message"];

function vehicleTrip($scope, vehicleService, gridUtility, constants, dialogService, template, message) {

    var gridOptions = {
        columnDefs: [                    
                    { name: 'vehicleTripName', field: 'vehicleTripName', displayName: 'TripName', type: 'string' },
                    { name: 'startingTime', field: 'startingTime', displayName: 'Start', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'reachingTime', field: 'reachingTime', displayName: 'End', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'odometerStart', field: 'odometerStart', displayName: 'Odometer Start', type: 'number' },
                    { name: 'odometerEnd', field: 'odometerEnd', displayName: 'Odometer End', type: 'number' },
                    template.getButtonDefaultColumnDefs('vehicleTripId', 'Fleet:VehicleTripEdit')
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

    function validateDates(form) {
        if (form !== undefined) {
            if (form.startingTime.$modelValue > form.reachingTime.$modelValue) {
                form.reachingTime.$setValidity('invalidEndDate', false)
            }
            else {
                form.reachingTime.$setValidity('invalidEndDate', true)
            }
        }
    }

    function validateOdometer(form) {
        if (form !== undefined) {
            if (form.odometerStart.$modelValue > form.odometerEnd.$modelValue) {
                form.odometerEnd.$setValidity('invalidEndOdometer', false)
            }
            else {
                form.odometerEnd.$setValidity('invalidEndOdometer', true)
            }
        }
    }


    function viewDialog(model, dialogMode, ev) {
        var validator = {
            endDateMessages: [{ type: 'invalidEndDate', text: message.invalidEndDate }],
            validateDates: validateDates,
            endOdometerMessages: [{ type: 'invalidEndOdometer', text: message.invalidEndOdometer }],
            validateOdometer: validateOdometer
        }

        dialogService.show({
            templateUrl: 'vehicle_trip_dialog',
            targetEvent: ev,
            data: { model: model, validator: validator },
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
