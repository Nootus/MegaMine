'use strict'

angular.module('emine').factory('sparePartOrderDialog', sparePartOrderDialog);

sparePartOrderDialog.$inject = ['$mdDialog', 'vehicleService', 'utility'];

function sparePartOrderDialog($mdDialog, vehicleService, utility) {

    var dialog = {
        viewDialog: viewDialog,
        editMode: false,
    };

    return dialog;

    function viewDialog(orderModel, editMode, ev) {
        var sparePartOrderId = orderModel.SparePartOrderId;
        dialog.editMode = editMode;

        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/fleet/sparePartOrderDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: vehicleService, model: vehicleService.currentSparePartOrder, editMode: dialog.editMode },
            resolve: { resolvemodel: function () { return vehicleService.getCurrentSparePartOrder(sparePartOrderId) } }
        })
        .then(function () {
            orderModel.OrderedUTCdatetime = vehicleService.currentSparePartOrder.OrderedUTCdatetime;
            orderModel.OrderedUnits = vehicleService.currentSparePartOrder.OrderedUnits;
            orderModel.UnitCost = vehicleService.currentSparePartOrder.UnitCost;
        }, function () {
            //nothing to do when we cancel
        });
    }

    function DialogController($scope, $mdDialog, service, model, editMode) {


        var vm = {
            save: save,
            cancel: cancel,
            model: model,
            editMode: editMode,
        }

        angular.extend($scope, vm);

        return vm;

        function cancel() {
            event.preventDefault();
            $mdDialog.cancel();
        };
        function save(form) {
            if (form.$valid) {
                service.saveSparePartOrder(vm.model).success(function () {
                    $mdDialog.hide();
                });
            }
        };
    }

}
