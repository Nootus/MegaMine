'use strict'
angular.module('megamine').factory('manufacturerDialog', manufacturerDialog);
manufacturerDialog.$inject = ["MegaMine.Shared.DialogService", 'vehicleService', "MegaMine.Shared.Utility"];

function manufacturerDialog(dialogService, vehicleService, utility) {

    var dialog =
    {
        viewDialog: viewDialog,
    };

    return dialog;

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: utility.virtualDirectory + '/app/fleet/manufacturerDialog.html',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            vehicleService.saveManufacturer(dialogModel).then(function () {
                if (model.vehicleManufacturerId === 0) {
                    vehicleService.getManufacturerList();
                }
                else {
                    model.name = dialogModel.name
                    model.description = dialogModel.description
                }
            });
            dialogService.hide();
        });
    }
}
