'use strict'

angular.module('emine').factory('manufacturerDialog', manufacturerDialog);

manufacturerDialog.$inject = ['$mdDialog', 'vehicleService', 'utility'];

function manufacturerDialog($mdDialog, vehicleService, utility)
{

    var dialog = {
        viewDialog: viewDialog,
        editMode: false,
    };

    return dialog;

    function viewDialog(manufacturerId, editMode, ev) {
        dialog.editMode = editMode;

        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/fleet/manufacturerDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: vehicleService, model: vehicleService.currentManufacturer, editMode: dialog.editMode },
            resolve: { resolvemodel: function () { return vehicleService.getCurrentManufacturer(manufacturerId) } }
        })
        .then(function () {
            //alert('You said the information was "' + answer + '".');
        }, function () {
            //nothing to do when we cancel
        });
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

        function save(form)
        {
            if (form.$valid)
            {
                service.saveManufacturer(vm.model).success(function () {
                    //refresh the grid
                    vehicleService.getManufacturerList();
                    $mdDialog.hide();
                });
            }
        };
    }

}
