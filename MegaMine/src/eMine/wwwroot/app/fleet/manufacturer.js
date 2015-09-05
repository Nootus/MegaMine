'use strict';
angular.module('emine').controller('manufacturer', manufacturer)
manufacturer.$inject = ['$scope', 'vehicleService', 'vehicleModelDialog', 'utility', 'constants', 'dialogService', 'template'];

function manufacturer($scope, vehicleService, vehicleModelDialog, utility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Name', type: 'string' },
                    { name: 'description', field: 'description', displayName: 'Description', type: 'string' },
                    template.getButtonDefaultColumnDefs('vehicleModelId', 'Fleet', 'ManufacturerModelEdit')
                    ]
    };

    var vm = {
        model: {},
        gridOptions: gridOptions,
        viewManufacturer: viewManufacturer,
        
        addModel: addModel,
        viewDialog: viewDialog
    };

    init();

    return vm;

    function init(){
        vm.model = vehicleService.manufacturer;
        utility.initializeSubGrid(vm, $scope, vehicleService.modelsList);
    }

    function viewManufacturer(ev){
        dialogService.show({
            templateUrl: utility.virtualDirectory + '/app/fleet/manufacturerDialog.html',
            targetEvent: ev,
            data: { model: vm.model },
            dialogMode: constants.enum.dialogMode.save
        })
        .then(function (dialogModel) {
            vehicleService.saveManufacturer(dialogModel).then(function () {
                vm.model.name = dialogModel.name
                vm.model.description = dialogModel.description
                dialogService.hide();
            });
        });
    }

    function addModel(ev) {
        var model = { vehicleModelId: 0, vehicleManufacturerId: vm.model.vehicleManufacturerId }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'driver_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            vehicleService.saveDriver(dialogModel).then(function () {
                //update the grid values
                if (dialogModel.vehicleDriverId === 0) {
                    vehicleService.getDrivers();
                }
                else {
                    model.driverName = dialogModel.driverName
                    model.contact = dialogModel.contact
                }

                dialogService.hide();
            });
        });
    }

    //function addModel(ev) {
    //    var model = { vehicleModelId: 0, vehicleManufacturerId: vm.model.vehicleManufacturerId }
    //    viewDialog(model, true, ev);
    //}

    //function viewDialog(model, editMode, ev) {
    //    vehicleModelDialog.viewDialog(model, editMode, ev);
    //}

    //function viewModel(model, editMode, ev) {
    //    model.VehicleModelId = 0;
    //    vehicleModelDialog.viewDialog(model, editMode, ev);
    //}

    //function editModel(model, editMode, ev) {
    //    vehicleModelDialog.viewDialog(model, editMode, ev);
    //}
}
