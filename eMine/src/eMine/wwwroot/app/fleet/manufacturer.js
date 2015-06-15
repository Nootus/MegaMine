'use strict';
angular.module('emine').controller('manufacturer', manufacturer)
vehicle.$inject = ['$state', 'vehicleService', 'manufacturer', 'utility'];

function manufacturer($state, vehicleService, vehicleDialog, utility) {

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
        viewManufacturer: viewManufacturer
   
    };

    init();

    return vm;

    function init()
    {
        vm.model = vehicleService.manufacturer;
        vm.gridOptions.data = vm.model.Models;
    }

    function viewManufacturer(ev)
    {
        manufacturerDialog.viewDialog(vm.model.VehicleManufacturerId, true, ev);
    }

  
}
