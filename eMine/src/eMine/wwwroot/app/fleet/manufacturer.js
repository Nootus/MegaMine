'use strict';
angular.module('emine').controller('manufacturer', manufacturer)
manufacturer.$inject = ['$state', 'vehicleService', 'vehicleModelDialog', 'manufacturerDialog'];

function manufacturer($state, vehicleService, vehicleModelDialog, manufacturerDialog) {

    var gridOptions = {
        enableColumnResizing: true,
        columnDefs: [
                    { name: 'Name', field: 'Name', displayName: 'Name' },
                    { name: 'Description', field: 'Description', displayName: 'Description' },
                    
        ]
    };

    var vm = {
        model: {},
        gridOptions: gridOptions,
        addModel: addModel,
        viewManufacturer: viewManufacturer
   
    };

    init();

    return vm;

    function init()
    {
        vm.model = vehicleService.manufacturer;
        vm.gridOptions.data = vehicleService.modelsList;
    }

    function viewManufacturer(ev)
    {
        manufacturerDialog.viewDialog(vm.model.VehicleManufacturerId, true, ev);
    }

    function addModel(ev) {
        var model = { VehicleModelId: 0, VehicleManufacturerId: vm.model.VehicleManufacturerId }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        vehicleModelDialog.viewDialog(model, editMode, ev);
    }

}
