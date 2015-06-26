'use strict'

angular.module('emine').factory('sparePartDialog', sparePartDialog);

sparePartDialog.$inject = ['$mdDialog', 'vehicleService', 'utility'];

function sparePartDialog($mdDialog, vehicleService, utility) {

    var dialog =
    {
        viewDialog: viewDialog,
    };

    return dialog;

    function viewDialog(sparePartId, editMode, ev)
    {

        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/fleet/sparePartDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: vehicleService, model: vehicleService.currentSparePart, editMode: dialog.editMode },
            resolve: { resolvemodel: function () { return vehicleService.getCurrentSparePart(sparePartId) } }
        })
    }

    function DialogController($scope, $mdDialog, service, model) {


        var vm = {
            save: save,
            cancel: cancel,
            model: model,
        }

        init();

        return vm;

        function init() {
            angular.extend($scope, vm);

            $scope.$watch("vm.model.VehicleManufacturerId", bindModelDropDown);
        }

        function bindModelDropDown(manufacturerId, oldmanufacturerId) {
            if (vm.model.ModelList === undefined) {
                vm.model.ModelList = [];
            }

            var modelList = vm.model.ModelList;
            var vehicleModelList = vm.model.VehicleModelList;

            modelList.splice(0, modelList.length);

            for (var counter = 0; counter < vehicleModelList.length; counter++) {
                if (vehicleModelList[counter].VehicleManufacturerId === manufacturerId) {
                    modelList.push({ Key: vehicleModelList[counter].VehicleModelId, Item: vehicleModelList[counter].Name })
                }
            }

            if (manufacturerId === oldmanufacturerId)
                return;

            if (modelList.length > 0) {
                vm.model.VehicleModelId = modelList[0].Key;
            }
            else {
                vm.model.VehicleModelId = 0;
            }
        }


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
