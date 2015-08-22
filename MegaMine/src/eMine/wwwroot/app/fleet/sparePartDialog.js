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
            if (vm.model.modelList === undefined) {
                vm.model.modelList = [];
            }

            var modelList = vm.model.modelList;
            var vehicleModelList = vm.model.vehicleModelList;

            modelList.splice(0, modelList.length);

            for (var counter = 0; counter < vehicleModelList.length; counter++) {
                if (vehicleModelList[counter].vehicleManufacturerId === manufacturerId) {
                    modelList.push({ Key: vehicleModelList[counter].vehicleModelId, Item: vehicleModelList[counter].name })
                }
            }

            if (manufacturerId === oldmanufacturerId)
                return;

            if (modelList.length > 0) {
                vm.model.vehicleModelId = modelList[0].key;
            }
            else {
                vm.model.vehicleModelId = 0;
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
