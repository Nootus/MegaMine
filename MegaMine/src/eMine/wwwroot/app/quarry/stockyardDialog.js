'use strict'

angular.module('emine').factory('stockyardDialog', stockyardDialog);

stockyardDialog.$inject = ['$mdDialog', 'quarryService', 'utility', 'constants'];

function stockyardDialog($mdDialog, quarryService, utility, constants) {

    var dialog = {
        viewDialog: viewDialog,
        dialogMode: undefined
    };

    return dialog;

    function viewDialog(model, dialogMode, ev) {

        dialog.dialogMode = dialogMode;

        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/quarry/stockyardDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: quarryService, model: model, dialogMode: dialog.dialogMode, constants: constants },
            resolve: {
                resolvemodel: function ()
                {
                    if (quarryService.materialViewModel == undefined) {
                        return quarryService.getMaterialViewModel()
                    }
                    else {
                        return true;
                    }
                }
            }
        })
    }

    function DialogController($scope, $mdDialog, service, model, dialogMode, constants) {


        var vm = {
            save: save,
            cancel: cancel,
            deleteItem: deleteItem,
            model: {},
            viewModel: {},
            service: service,
            dialogMode: dialogMode,
            dialogModeEnum: constants.enum.dialogMode
        }

        init();

        return vm;

        function init() {
            angular.extend(vm.model, model);
            angular.extend(vm.viewModel, service.materialViewModel);
            angular.extend($scope, vm);
        }

        function cancel() {
            event.preventDefault();
            $mdDialog.cancel();
        }

        function deleteItem(){
            event.preventDefault();
            $mdDialog.cancel();
        }

        function save(form) {
            if (form.$valid) {
                service.materialUpdate(vm.model).then(function () {
                    $mdDialog.hide();
                });
            }
        };
    }

}
