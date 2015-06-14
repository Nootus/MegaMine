'use strict'

angular.module('emine').factory('sparePartDialog', sparePartDialog);

sparePartDialog.$inject = ['$mdDialog', 'vehicleService', 'utility'];

function sparePartDialog($mdDialog, vehicleService, utility) {

    var dialog =
    {
        viewDialog: viewDialog,
    };

    return dialog;

    function viewDialog(sparePartId, ev) {

        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/fleet/sparePartDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: vehicleService, model: vehicleService.currentSparePart },
            resolve: { resolvemodel: function () { return vehicleService.getCurrentSparePart(sparePartId) } }
        })
    }

    function DialogController($scope, $mdDialog, service, model) {


        var vm = {
            save: save,
            cancel: cancel,
            model: model,
        }

        angular.extend($scope, vm);

        return vm;

        function cancel() {
            event.preventDefault();
            $mdDialog.cancel();
        };
        function save(form) {
            if (form.$valid) {
                service.saveSparePart(vm.model).success(function () {
                    //refresh the grid
                    vehicleService.getSparePartList();
                    $mdDialog.hide();
                });
            }
        };
    }

}
