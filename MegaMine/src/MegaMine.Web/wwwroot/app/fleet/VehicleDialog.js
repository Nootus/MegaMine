'use strict'

angular.module('megamine').factory('vehicleDialog', vehicleDialog);

vehicleDialog.$inject = ["MegaMine.Shared.Dialog.DialogService", 'vehicleService', "MegaMine.Shared.Utility", 'fleetUtility'];

function vehicleDialog(dialogService, vehicleService, utility, fleetUtility) {

    var dialog = {
        viewDialog: viewDialog,
    };

    return dialog;

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: utility.virtualDirectory + '/app/fleet/vehicleDialog.html',
            targetEvent: ev,
            data: { model: vehicleService.currentVehicle },
            dialogMode: dialogMode,
            dialogInit: dialogInit,
            resolve: { resolvemodel: function () { return vehicleService.getCurrentVehicle(model.vehicleId) } }
        })
        .then(function (dialogModel) {
            vehicleService.saveVehicle(dialogModel).then(function () {
                if (model.vehicleId === 0) {
                    vehicleService.getVehicleList();
                }
                else {
                    model.vehicleType = utility.getListItem(dialogModel.vehicleTypeList, dialogModel.vehicleTypeId);
                    model.manufacturer = utility.getListItem(dialogModel.manufacturerList, dialogModel.vehicleManufacturerId);
                    model.vehicleModel = utility.getListItem(dialogModel.modelList, dialogModel.vehicleModelId);

                    model.registrationNumber = dialogModel.registrationNumber
                    model.vehicleTypeId = dialogModel.vehicleTypeId
                    model.vehicleManufacturerId = dialogModel.vehicleManufacturerId
                    model.vehicleModelId = dialogModel.vehicleModelId
                }
                dialogService.hide();
            });
        });

    }

    function dialogInit(dialogScope, dialogModel) {
        fleetUtility.watchManufacturerModel(dialogScope, dialogModel);
    }

}
