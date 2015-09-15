'use strict'
angular.module('emine').factory('sparePartDialog', sparePartDialog);
sparePartDialog.$inject = ['$rootScope', 'dialogService', 'vehicleService', 'utility'];

function sparePartDialog($rootScope, dialogService, vehicleService, utility) {

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
            resolve: { function () { return vehicleService.getCurrentSparePart(model.sparePartId) } }
        })
        .then(function (dialogModel) {
            vehicleService.saveSparePart(dialogModel).then(function () {
                if (dialogModel.sparePartId === 0) {
                    vehicleService.getSparePartList();
                }
                else {
                    model.name = dialogModel.name
                    model.description = dialogModel.description
                    model.vehicleType = dialogModel.description
                    model.vehicleManufacturer = dialogModel.description
                    model.vehicleModel = dialogModel.description
                }
                dialogService.hide();
            });
        });

        $rootScope.$watch(function () {
            return dialogService.dialogModel.vehicleManufacturerId;
        }, bindModelDropDown);
    }

    function bindModelDropDown(manufacturerId, oldmanufacturerId) {
        if (dialogService.dialogModel.modelList === undefined) {
            dialogService.dialogModel.modelList = [];
        }

        var modelList = dialogService.dialogModel.modelList;
        var vehicleModelList = dialogService.dialogModel.vehicleModelList;
        if (vehicleModelList === undefined)
            return;

        modelList.splice(0, modelList.length);

        for (var counter = 0; counter < vehicleModelList.length; counter++) {
            if (vehicleModelList[counter].vehicleManufacturerId === manufacturerId) {
                modelList.push({ key: vehicleModelList[counter].vehicleModelId, item: vehicleModelList[counter].name })
            }
        }

        if (manufacturerId === oldmanufacturerId)
            return;

        if (modelList.length > 0) {
            dialogService.dialogModel.vehicleModelId = modelList[0].key;
        }
        else {
            dialogService.dialogModel.vehicleModelId = 0;
        }
    }
}
