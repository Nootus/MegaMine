'use strict'
angular.module('emine').factory('sparePartDialog', sparePartDialog);
sparePartDialog.$inject = ['$rootScope', 'dialogService', 'vehicleService', 'utility'];

function sparePartDialog($rootScope, dialogService, vehicleService, utility) {

    var dialog =
    {
        viewDialog: viewDialog
    };

    return dialog;

    function viewDialog(scope, model, dialogMode, ev)
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
                if (dialogModel.vehicleDriverId === 0) {
                    vehicleService.getSparePartList();
                }
                else {
                    model.name = dialogModel.name
                    model.description = dialogModel.description
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



    //function DialogController($scope, $mdDialog, service, model) {


    //    var vm = {
    //        save: save,
    //        cancel: cancel,
    //        model: model,
    //    }

    //    init();

    //    return vm;

    //    function init() {
    //        angular.extend($scope, vm);

    //        //$scope.$watch("dialog.model.VehicleManufacturerId", bindModelDropDown);
    //    }

    //    function bindModelDropDown(manufacturerId, oldmanufacturerId) {
    //        if (vm.model.modelList === undefined) {
    //            vm.model.modelList = [];
    //        }

    //        var modelList = vm.model.modelList;
    //        var vehicleModelList = vm.model.vehicleModelList;

    //        modelList.splice(0, modelList.length);

    //        for (var counter = 0; counter < vehicleModelList.length; counter++) {
    //            if (vehicleModelList[counter].vehicleManufacturerId === manufacturerId) {
    //                modelList.push({ Key: vehicleModelList[counter].vehicleModelId, Item: vehicleModelList[counter].name })
    //            }
    //        }

    //        if (manufacturerId === oldmanufacturerId)
    //            return;

    //        if (modelList.length > 0) {
    //            vm.model.vehicleModelId = modelList[0].key;
    //        }
    //        else {
    //            vm.model.vehicleModelId = 0;
    //        }
    //    }


    //    function cancel() {
    //        event.preventDefault();
    //        $mdDialog.cancel();
    //    };
    //    function save(form) {
    //        if (form.$valid) {
    //            service.saveSparePart(vm.model).success(function () {
    //                //refresh the grid
    //                vehicleService.getSparePartList();
    //                $mdDialog.hide();
    //            });
    //        }
    //    };
    //}

}
