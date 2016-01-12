'use strict'

angular.module('megamine').factory('dialogService', dialogService);
dialogService.$inject = ['$timeout', '$q', '$mdDialog', 'utility'];

function dialogService($timeout, $q, $mdDialog, utility) {
    var vm = {
        show: show,
        hide: hide,
        deferred: undefined,
        dialogModel: {}
    };

    init();


    function init() {

    }

    function show(options) {
        vm.deferred = $q.defer();

        $mdDialog.show({
            controller: dialogController,
            controllerAs: "vm",
            templateUrl: options.templateUrl,
            targetEvent: options.targetEvent,
            locals: { dialogOptions: options },
            resolve: options.resolve
        });

        return vm.deferred.promise;
    }

    function hide() {
        $mdDialog.hide();
    }

    dialogController.$inject = ['$scope', '$mdDialog', 'dialogOptions']
    function dialogController($scope, $mdDialog, dialogOptions) {


        var dialog = {
            save: save,
            cancel: cancel,
            deleteItem: deleteItem,
            dialogMode: dialogOptions.dialogMode,
            deferredPromiseState: undefined,
            dialogError: dialogOptions.data.error,
            parentVm: dialogOptions.parentVm
        }

        init();

        return dialog;

        function init() {
            angular.extend(dialog, dialogOptions.data);
            //cloning the model
            if (dialogOptions.data.model !== undefined) {
                dialog.model = angular.copy(dialogOptions.data.model);
            }
            angular.extend($scope, dialog);

            if (dialogOptions.dialogInit !== undefined) {
                dialogOptions.dialogInit($scope, dialog.model);
            }
        }

        function cancel(ev) {
            ev.preventDefault();
            $mdDialog.cancel();
        }
        function save(form) {
            resolveDialog(form);
        }
        function deleteItem(form) {
            resolveDialog(form);
        }

        function resolveDialog(form) {
            if (form.$valid) {
                if (dialog.deferredPromiseState === undefined)
                    dialog.deferredPromiseState = angular.copy(vm.deferred.promise.$$state);
                angular.extend(vm.deferred.promise.$$state, dialog.deferredPromiseState)
                if (dialogOptions.returnForm === true) {
                    vm.deferred.resolve({ dialogModel: dialog.model, form: form });
                }
                else {
                    vm.deferred.resolve(dialog.model)
                }
            }
        }
    }

    return vm;

}