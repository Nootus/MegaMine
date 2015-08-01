'use strict'

angular.module('emine').factory('driverDialog', driverDialog);

driverDialog.$inject = ['$mdDialog', 'vehicleService', 'utility'];

function driverDialog($mdDialog, vehicleService, utility) {

    var dialog = {
        viewDialog: viewDialog,
        editMode: false
    };

    return dialog;

    function viewDialog(model, editMode, ev) {

        dialog.editMode = editMode;

        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/fleet/driverDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: vehicleService, model: model, editMode: dialog.editMode }
        })
    }

    function DialogController($scope, $mdDialog, service, model, editMode) {


        var vm = {
            save: save,
            cancel: cancel,
            model: {},
            editMode: editMode
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
                service.saveDriver(vm.model).success(function () {
                    //update the grid values
                    if (vm.model.VehicleDriverId === 0) {
                        service.getDrivers();
                    }
                    else {
                        model.DriverName = vm.model.DriverName
                        model.Contact = vm.model.Contact
                    }

                    $mdDialog.hide();
                });
            }
        };
    }

}
