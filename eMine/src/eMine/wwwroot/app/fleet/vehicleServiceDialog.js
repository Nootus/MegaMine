'use strict'

angular.module('emine').factory('vehicleServiceDialog', vehicleServiceDialog);

vehicleServiceDialog.$inject = ['$mdDialog', 'vehicleService', 'utility'];

function vehicleServiceDialog($mdDialog, vehicleService, utility) {

    var dialog = {
        viewDialog: viewDialog,
        editMode: false,
    };

    return dialog;

    function viewDialog(vehicleServiceId, editMode, ev) {
        dialog.editMode = editMode;

        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/fleet/vehicleServiceDialog.html',
            targetEvent: ev,
            locals: {$mdDialog: $mdDialog, service: vehicleService, model: vehicleService.currentVehicleService, editMode: dialog.editMode },
            resolve: { resolvemodel: function () { return vehicleService.getCurrentService(vehicleServiceId) } }
        })
    }

    function DialogController($scope, $mdDialog, service, model, editMode) {


        var vm = {
            save: save,
            cancel: cancel,
            model: model,
            editMode: editMode,
            addPart: addPart,
            removePart: removePart
        }

        angular.extend($scope, vm);

        return vm;

        function cancel() {
            event.preventDefault();
            $mdDialog.cancel();
        };
        function save(form) {
            if (form.$valid) {
                service.saveVehicleService(vm.model).success(function () {
                    $mdDialog.hide();
                });
            }
        };

        function addPart() {
            event.preventDefault();
            vm.model.SpareParts.push({ VehicleServiceSparePartId: undefined, SparePartId: 0, Quantity: undefined });
        }

        function removePart(index) {
            event.preventDefault();
            vm.model.SpareParts.splice(index, 1);
        }
    }

}
