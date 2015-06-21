'use strict'

angular.module('emine').factory('vehicleModelDialog', vehicleModelDialog);

vehicleModelDialog.$inject = ['$mdDialog', 'vehicleService', 'utility'];

function vehicleModelDialog($mdDialog, vehicleService, utility) {

    var dialog = {
        viewDialog: viewDialog,
        editMode: false,
    };

    return dialog;

    function viewDialog(model, editMode, ev)
    {
        dialog.editMode = editMode;

        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/fleet/vehicleModelDialog.html',
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

        function cancel()
        {
            event.preventDefault();
            $mdDialog.cancel();
        };

        function save(form) {
            if (form.$valid) {
                service.saveModel(vm.model).success(function ()
                {
                    //update the grid values
                    if (vm.model.VehicleModelId === 0)
                    {
                        vehicleService.getManufacturer(vm.model.VehicleManufacturerId);
                    }
                    else
                    {
                        model.Name = vm.model.Name
                        model.Description = vm.model.Description                        
                    }

                    $mdDialog.hide();

                });
            }
        };
    }

}
