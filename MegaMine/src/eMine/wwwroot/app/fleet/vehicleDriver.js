'use strict';
angular.module('emine').controller('vehicleDriver', vehicleDriver)
vehicleDriver.$inject = ['$scope', '$window', 'vehicleService', 'vehicleDriverDialog', 'gridUtility', 'utility', 'constants', 'dialogService', 'template'];

function vehicleDriver($scope, $window, vehicleService, vehicleDriverDialog, gridUtility, utility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'driverName', field: 'driverName', displayName: 'Driver', type:'string' },
                    { name: 'assignmentStartDate', field: 'assignmentStartDate', displayName: 'Start Time', type: 'date', cellFilter: 'date:"' + constants.dateTimeFormat + '"' },
                    { name: 'assignmentEndDate', field: 'assignmentEndDate', displayName: 'End Time', type: 'date', cellFilter: 'date:"' + constants.dateTimeFormat + '"' },
                    template.getButtonDefaultColumnDefs('vehicleDriverAssignmentId', 'Fleet', 'VehicleDriverEdit')
                    ]
    };

    var vm = {
        vehicleId: 0,
        vehicleDriverAssignmentId: 0,
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addDriver: addDriver,
        assignDriver: assignDriver,
        unAssignDriver:unAssignDriver,
        editMode: 0,
    };

    init();

    return vm;

    function init() {
        vm.vehicleId = vehicleService.vehicle.vehicleId;
        vm.editMode = vehicleService.vehicle.driver === null ? 2 : 3;

        gridUtility.initializeSubGrid(vm, $scope, vehicleService.vehicleDriverList);
    }

    function unAssignDriver(ev) {
        //getting the model for unassign
        var model;
        if (vehicleService.vehicle.vehicleDriverAssignmentId !== null){
            for(var counter = 0; counter < vehicleService.vehicleDriverList.length; counter ++){
                if (vehicleService.vehicleDriverList[counter].vehicleDriverAssignmentId === vehicleService.vehicle.vehicleDriverAssignmentId) {
                    model = vehicleService.vehicleDriverList[counter];
                    break;
                }
            }
        }
        else {
            for (var counter = 0; counter < vehicleService.vehicleDriverList.length; counter++) {
                if (vehicleService.vehicleDriverList[counter].assignmentEndDate === null) {
                    model = vehicleService.vehicleDriverList[counter];
                    break;
                }
            }
        }
        viewDialog(model, 3, ev);
    }

    function assignDriver(ev) {
        var model = { vehicleDriverAssignmentId: 0, vehicleId: vm.vehicleId }
        viewDialog(model, 2, ev);
    }

    function addDriver(ev) {
        var model = { vehicleDriverAssignmentId: 0, vehicleId: vm.vehicleId }
        viewDialog(model, 1, ev);
    }

    function viewDialog(model, editMode, ev) {
        dialogService.show({
            templateUrl: 'vehicle_driver_dialog',
            targetEvent: ev,
            data: { service: vehicleService, model: model, editMode: editMode },
            dialogMode: undefined,
            resolve: { resolvemodel: function () { return vehicleService.getDriversListItems() } }
        })
        .then(function (dialogModel) {
            vehicleService.saveVehiceDriver(dialogModel).success(function () {
                var driverName = utility.getListItem(vehicleService.driverListItems, dialogModel.vehicleDriverId);

                if (editMode === 2) {
                    vehicleService.vehicle.driver = driverName;
                    vm.editMode = 3;
                }
                else if (editMode === 3 || vehicleService.vehicle.vehicleDriverAssignmentId === dialogModel.vehicleDriverAssignmentId) {
                    vehicleService.vehicle.driver = undefined;
                    vehicleService.vehicle.vehicleDriverAssignmentId = undefined;
                    vm.editMode = 2;
                }
                //update the grid values
                if (dialogModel.vehicleDriverAssignmentId === 0) {
                    vehicleService.getVehicleDriverList(dialogModel.vehicleId);
                }
                else {
                    model.driverName = driverName;
                    model.vehicleDriverId = dialogModel.vehicleDriverId;
                    model.assignmentStartDate = dialogModel.assignmentStartDate;
                    model.assignmentEndDate = dialogModel.assignmentEndDate;
                }

                dialogService.hide();
            });
        });
    }
}
