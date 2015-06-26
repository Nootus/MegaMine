'use strict'

angular.module('emine').factory('vehicleDialog', vehicleDialog);

vehicleDialog.$inject = ['$mdDialog', 'vehicleService', 'utility'];

function vehicleDialog($mdDialog, vehicleService, utility) {

    var dialog = {
        viewDialog: viewDialog,
        editMode: false,
    };

    return dialog;

    function viewDialog(vehicleId, editMode, ev)
    {
        dialog.editMode = editMode;

        $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/fleet/vehicleDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: vehicleService, model: vehicleService.currentVehicle, editMode: dialog.editMode },
            resolve: { resolvemodel: function () { return vehicleService.getCurrentVehicle(vehicleId) } }
        })
        .then(function () {
            //alert('You said the information was "' + answer + '".');
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
                //populating the vehicletype
                vm.model.VehicleType = utility.getListItem(vm.model.VehicleTypeList, vm.model.VehicleTypeId);
                vm.model.Manufacturer = utility.getListItem(vm.model.ManufacturerList, vm.model.VehicleManufacturerId);
                vm.model.VehicleModel = utility.getListItem(vm.model.ModelList, vm.model.VehicleModelId);
                service.saveVehicle(vm.model).success(function () {
                    //refresh the grid
                    if (vm.model.VehicleId === 0) {
                        vehicleService.getVehicleList();
                    }
                    $mdDialog.hide();
                });
            }
        };
    }

}
