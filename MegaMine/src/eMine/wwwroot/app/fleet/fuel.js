'use strict';
angular.module('emine').controller('fuel', fuel)
fuel.$inject = ['$scope', 'vehicleService', 'utility', 'constants', 'dialogService', 'template'];

function fuel($scope, vehicleService, utility, constants, dialogService, template) {

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
    };

    init();

    return vm;

    function init() {
        utility.initializeSubGrid(vm, $scope, vehicleService.fuelList);
    }

    function addFuel(ev) {
        var model = { vehicleFuelId: 0, vehicleId: vehicleService.vehicle.vehicleId }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'vehicle_fuel_dialog',
            targetEvent: ev,
            data: { model: model },
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
            });
        });
    }
}
