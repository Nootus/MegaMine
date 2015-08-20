'use strict'

angular.module('emine').factory('vehicleDriverDialog', vehicleDriverDialog);

vehicleDriverDialog.$inject = ['$mdDialog', 'vehicleService', 'utility', 'moment'];

function vehicleDriverDialog($mdDialog, vehicleService, utility, moment) {

    var dialog = {
        viewDialog: viewDialog,
        editMode: 0,        //0 - view, 1 - edit/add, 2 - register, 3 - deregister
    };

    return dialog;

    function viewDialog(model, editMode, ev) {
        dialog.editMode = editMode;

        return $mdDialog.show({
            controller: DialogController,
            controllerAs: "vm",
            templateUrl: utility.virtualDirectory + '/app/fleet/vehicleDriverDialog.html',
            targetEvent: ev,
            locals: { $mdDialog: $mdDialog, service: vehicleService, model: model, editMode: dialog.editMode },
            resolve: { resolvemodel: function () { return vehicleService.getDriversListItems() } }
        });
    }

    function DialogController($scope, $mdDialog, service, model, editMode) {


        var vm = {
            save: save,
            cancel: cancel,
            model: {},
            editMode: editMode,
            driverListItems: service.driverListItems
        }

        init();

        return vm;

        function init() {
            angular.extend(vm.model, model);
            angular.extend($scope, vm);

            if (editMode === 2) { //Assigning a driver
                vm.model.assignmentStartDate = new Date();
            }
            else if (editMode === 3) { //deassign a driver
                vm.model.assignmentEndDate = new Date();
            }
        }

        function cancel() {
            event.preventDefault();
            $mdDialog.cancel();
        };
        function save(form) {

            if (form.$valid) {
                service.saveVehiceDriver(vm.model).success(function () {
                    var driverName = utility.getListItem(vm.driverListItems, vm.model.vehicleDriverId);

                    if (editMode === 2) {
                        service.vehicle.Driver = driverName;
                    }
                    else if (editMode === 3 || service.vehicle.vehicleDriverAssignmentId === vm.model.vehicleDriverAssignmentId) {
                        service.vehicle.driver = null;
                        service.vehicle.vehicleDriverAssignmentId = null;
                    }
                    //update the grid values
                    if (vm.model.vehicleDriverAssignmentId === 0) {
                        service.getVehicleDriverList(vm.model.vehicleId);
                    }
                    else {
                        model.driverName = driverName;
                        model.vehicleDriverId = vm.model.vehicleDriverId;
                        model.assignmentStartDate = vm.model.assignmentStartDate;
                        model.assignmentEndDate = vm.model.assignmentEndDate;
                    }

                    $mdDialog.hide();
                });
            }
        };
    }

}
