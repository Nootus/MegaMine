'use strict';
angular.module('megamine').controller('vehicleFuel', vehicleFuel)
vehicleFuel.$inject = ['$scope', 'vehicleService', "MegaMine.Shared.GridUtility", 'dialogUtility', "MegaMine.Shared.Constants", 'dialogService', "MegaMine.Shared.Template"];

function vehicleFuel($scope, vehicleService, gridUtility, dialogUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'fuelDate', field: 'fuelDate', displayName: 'Fuel Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quantity', field: 'quantity', displayName: 'Quantity', type: 'number' },
                    { name: 'odometer', field: 'odometer', displayName: 'Odometer', type: 'number' },
                    template.getButtonDefaultColumnDefs('vehicleFuelId', 'Fleet:VehicleFuelEdit')
                    ]
        };

    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addFuel: addFuel,
        resetFuel: resetFuel
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeSubGrid(vm.gridOptions, $scope, vehicleService.fuelList);
    }

    function addFuel(ev) {
        var model = { vehicleFuelId: 0, vehicleId: vehicleService.vehicle.vehicleId }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        var error = {};
        dialogService.show({
            templateUrl: 'vehicle_fuel_dialog',
            targetEvent: ev,
            data: { model: model, error: error },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            vehicleService.saveFuel(dialogModel).then(function () {
                //update the grid values
                if (dialogModel.vehicleFuelId === 0) {
                    vehicleService.getFuelList(dialogModel.vehicleId);
                }
                else {
                    model.odometer = dialogModel.odometer
                    model.quantity = dialogModel.quantity
                    model.fuelDate = dialogModel.fuelDate
                }

                dialogService.hide();
            }).catch(function (data) {
                error.message = data.message;
            });
        });
    }

    function resetFuel(ev) {
        dialogUtility.confirm('Reset Average', 'Please confirm to reset fuel average', ev)
            .then(function () {
            vehicleService.resetFuelAverage(vehicleService.vehicle.vehicleId)
                .then(function () {
                    vehicleService.vehicle.fuelAverage = null;
                });
        });
    }
}
