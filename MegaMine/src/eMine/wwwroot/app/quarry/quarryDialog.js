'use strict'

angular.module('emine').factory('quarryDialog', quarryDialog);

quarryDialog.$inject = ['$mdDialog', 'quarryService', 'utility'];

function quarryDialog($mdDialog, quarryService, utility) {

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
            templateUrl: utility.virtualDirectory + '/app/quarry/quarryDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: quarryService, model: model, editMode: dialog.editMode }
        })
    }

    function DialogController($scope, $mdDialog, service, model, editMode) {


        var vm = {
            save: save,
            cancel: cancel,
            model: {},
            service: service,
            editMode: editMode
        }

        init();

        return vm;

        function init() {
            vm.model.colourIds = [];
            angular.extend(vm.model, model);
            angular.extend($scope, vm);
        }

        function cancel() {
            event.preventDefault();
            $mdDialog.cancel();
        };
        function save(form) {
            if (form.$valid) {
                service.saveQuarry(vm.model).success(function () {
                    //update the grid values
                    if (vm.model.quarryId === 0) {
                        service.getQuarries();
                    }
                    else {
                        model.quarryName = vm.model.quarryName
                        model.location = vm.model.location
                        model.colours = utility.getItem(service.colours, vm.model.colourIds[0], "materialColourId", "colourName");
                    }

                    $mdDialog.hide();
                });
            }
        };
    }

}
