'use strict'

angular.module('emine').factory('fuelDialog', fuelDialog);

fuelDialog.$inject = ['$mdDialog', 'vehicleService', 'utility'];

function fuelDialog($mdDialog, vehicleService, utility) {

    var dialog = {
        viewDialog: viewDialog,
        editMode: false,
    };

    return dialog;

    function viewDialog(model, editMode, ev) {
        dialog.editMode = editMode;

        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/fleet/fuelDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: vehicleService, model: model, editMode: dialog.editMode }
        })
    }

    function DialogController($scope, $mdDialog, service, model, editMode) {


        var vm = {
            save: save,
            cancel: cancel,
            model: {},
            editMode: editMode,
        }

        init();

        return vm;

        function init() {
            angular.extend(vm.model, model);
            angular.extend($scope, vm);
        }

        function cancel() {
            event.preventDefault();
            $mdDialog.cancel();
        };
        function save(form) {
            if (form.$valid) {
                service.saveFuel(vm.model).success(function () {
                    //update the grid values
                    if (vm.model.VehicleFuelId === 0) {
                        vehicleService.getFuelList(vm.model.VehicleId);
                    }
                    else {
                        model.Odometer = vm.model.Odometer
                        model.Quantity = vm.model.Quantity
                        model.FuelDate = vm.model.FuelDate
                    }

                    $mdDialog.hide();
                });
            }
        };
    }

}
