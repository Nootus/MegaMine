'use strict';
angular.module('megamine').controller('vehicleDriver', vehicleDriver)
vehicleDriver.$inject = ['$scope', '$window', 'vehicleService', 'gridUtility', "MegaMine.Shared.Utility", "MegaMine.Shared.Constants", 'dialogService', 'template', 'message'];

function vehicleDriver($scope, $window, vehicleService, gridUtility, utility, constants, dialogService, template, message) {

    var gridOptions = {
        columnDefs: [
                    { name: 'driverName', field: 'driverName', displayName: 'Driver', type:'string' },
                    { name: 'assignmentStartDate', field: 'assignmentStartDate', displayName: 'Start Time', type: 'date', cellFilter: 'date:"' + constants.dateTimeFormat + '"' },
                    { name: 'assignmentEndDate', field: 'assignmentEndDate', displayName: 'End Time', type: 'date', cellFilter: 'date:"' + constants.dateTimeFormat + '"' },
                    template.getButtonDefaultColumnDefs('vehicleDriverAssignmentId', 'Fleet:VehicleDriverEdit')
                    ]
    };

    var vm = {
        vehicleId: 0,
        vehicleDriverAssignmentId: 0,
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addDriver: addDriver,
        assignDriver: assignDriver,
        unAssignDriver: unAssignDriver,
        assignMode: undefined,
        enum: { assignMode: { none: 0, assign: 1, unassign: 2 } }
    };

    init();

    return vm;

    function init() {
        vm.vehicleId = vehicleService.vehicle.vehicleId;
        vm.assignMode = vehicleService.vehicle.driver === null ? vm.enum.assignMode.assign : vm.enum.assignMode.unassign;

        gridUtility.initializeSubGrid(vm.gridOptions, $scope, vehicleService.vehicleDriverList);
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
        viewDialog(model, constants.enum.dialogMode.save, ev, "Unassign", vm.enum.assignMode.unassign);
    }

    function assignDriver(ev) {
        var model = { vehicleDriverAssignmentId: 0, vehicleId: vm.vehicleId }
        viewDialog(model, constants.enum.dialogMode.save, ev, "Assign", vm.enum.assignMode.assign);
    }

    function addDriver(ev) {
        var model = { vehicleDriverAssignmentId: 0, vehicleId: vm.vehicleId }
        viewDialog(model, constants.enum.dialogMode.save, ev, "Save");
    }

    function validateDates(form) {
        if (form !== undefined) {
            if (form.assignmentStartDate.$modelValue > form.assignmentEndDate.$modelValue) {
                form.assignmentEndDate.$setValidity('invalidEndDate', false)
            }
            else {
                form.assignmentEndDate.$setValidity('invalidEndDate', true)
            }
        }
    }

    function viewDialog(model, dialogMode, ev, saveText, assignMode) {
        saveText = saveText === undefined ? "Save" : saveText;
        assignMode = assignMode === undefined ? vm.enum.assignMode.none : assignMode;

        var validator = {
            endDateMessages: [{ type: 'invalidEndDate', text: message.invalidEndTime }],
            validateDates: validateDates
        }

        dialogService.show({
            templateUrl: 'vehicle_driver_dialog',
            targetEvent: ev,
            data: { service: vehicleService, model: model, validator: validator, options: { saveText: saveText, assignMode: assignMode, assignModeEnum: vm.enum.assignMode } },
            dialogMode: dialogMode,
            resolve: { resolvemodel: function () { return vehicleService.getDriversListItems() } }
        })
        .then(function (dialogModel) {
            vehicleService.saveVehiceDriver(dialogModel).then(function () {
                var driverName = utility.getListItem(vehicleService.driverListItems, dialogModel.vehicleDriverId);

                if (assignMode === vm.enum.assignMode.assign) {
                    vehicleService.vehicle.driver = driverName;
                    vm.assignMode = vm.enum.assignMode.unassign;
                }
                else if (assignMode === vm.enum.assignMode.unassign || vehicleService.vehicle.vehicleDriverAssignmentId === dialogModel.vehicleDriverAssignmentId) {
                    vehicleService.vehicle.driver = undefined;
                    vehicleService.vehicle.vehicleDriverAssignmentId = undefined;
                    vm.assignMode = vm.enum.assignMode.assign;
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
