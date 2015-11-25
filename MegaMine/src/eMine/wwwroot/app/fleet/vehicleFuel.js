'use strict';
angular.module('emine').controller('vehicleFuel', vehicleFuel)
vehicleFuel.$inject = ['$scope', '$mdDialog', 'vehicleService', 'gridUtility', 'constants', 'dialogService', 'template'];

function vehicleFuel($scope, $mdDialog, vehicleService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'fuelDate', field: 'fuelDate', displayName: 'Fuel Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quantity', field: 'quantity', displayName: 'Quantity', type: 'number' },
                    { name: 'odometer', field: 'odometer', displayName: 'Odometer', type: 'number' },
                    template.getButtonDefaultColumnDefs('vehicleFuelId', 'Fleet', 'VehicleFuelEdit')
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
        var confirm = $mdDialog.confirm()
          .parent(angular.element(document.body))
          .title('Reset Average')
          .content('Please confirm to reset fuel average')
          .ariaLabel('Reset Average')
          .ok('Yes')
          .cancel('No')
          .targetEvent(ev);
        $mdDialog.show(confirm).then(function () {
            vehicleService.resetFuelAverage(vehicleService.vehicle.vehicleId)
                .then(function () {
                    vehicleService.vehicle.fuelAverage = null;
                });
        });
    }
}
