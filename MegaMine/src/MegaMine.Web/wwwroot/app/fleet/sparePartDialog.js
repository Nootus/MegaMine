'use strict'
angular.module('megamine').factory('sparePartDialog', sparePartDialog);
sparePartDialog.$inject = ["MegaMine.Shared.DialogService", 'vehicleService', "MegaMine.Shared.Utility", 'fleetUtility'];

function sparePartDialog(dialogService, vehicleService, utility, fleetUtility) {

    var dialog =
    {
        viewDialog: viewDialog
    };

    return dialog;

    function viewDialog(model, dialogMode, ev)
    {
        dialogService.show({
            templateUrl: utility.virtualDirectory + '/app/fleet/sparePartDialog.html',
            targetEvent: ev,
            data: { model: vehicleService.currentSparePart },
            dialogMode: dialogMode,
            resolve: { resolveModel : function () { return vehicleService.getCurrentSparePart(model.sparePartId) } }
        })
        .then(function (dialogModel) {
            vehicleService.saveSparePart(dialogModel).then(function () {
                if (dialogModel.sparePartId === 0) {
                    vehicleService.getSparePartList();
                }
                else {
                    model.name = dialogModel.name
                    model.description = dialogModel.description
                    model.vehicleType = utility.getListItem(dialogModel.vehicleTypeList, dialogModel.vehicleTypeId);
                    model.manufacturer = utility.getListItem(dialogModel.manufacturerList, dialogModel.vehicleManufacturerId);
                    model.vehicleModel = utility.getListItem(dialogModel.modelList, dialogModel.vehicleModelId);
                }
                dialogService.hide();
            });
        });

        fleetUtility.watchManufacturerModel(dialogService.dialogModel);
    }

}
