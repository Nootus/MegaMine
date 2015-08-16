'use strict'

angular.module('emine').factory('yardDialog', yardDialog);

yardDialog.$inject = ['$mdDialog', 'quarryService', 'utility'];

function yardDialog($mdDialog, quarryService, utility) {

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
            templateUrl: utility.virtualDirectory + '/app/quarry/yardDialog.html',
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
                service.saveYard(vm.model).success(function () {
                    //update the grid values
                    if (vm.model.yardId === 0) {
                        service.getYards();
                    }
                    else {
                        model.yardName = vm.model.yardName
                        model.location = vm.model.location
                    }

                    $mdDialog.hide();
                });
            }
        };
    }

}
