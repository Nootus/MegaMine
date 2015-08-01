'use strict'

angular.module('emine').factory('materialColourDialog', materialColourDialog);

materialColourDialog.$inject = ['$mdDialog', 'quarryService', 'utility'];

function materialColourDialog($mdDialog, quarryService, utility) {

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
            templateUrl: utility.virtualDirectory + '/app/quarry/materialColourDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: quarryService, model: model, editMode: dialog.editMode }
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
                service.saveMaterialColour(vm.model).success(function () {
                    //update the grid values
                    if (vm.model.MaterialColourId === 0) {
                        quarryService.getMaterialColours();
                    }
                    else {
                        model.ColourName = vm.model.ColourName
                        model.ColourDescription = vm.model.ColourDescription
                    }

                    $mdDialog.hide();
                });
            }
        };
    }

}
