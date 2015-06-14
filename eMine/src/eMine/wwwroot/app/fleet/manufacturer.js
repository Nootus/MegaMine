'use strict';
angular.module('emine').controller('manufacturer', manufacturer)
vehicle.$inject = ['$state', 'vehicleService', 'manufacturer', 'utility'];

function manufacturer($state, vehicleService, vehicleDialog, utility) {

    var vm = {
        model: {},
        viewManufacturer: viewManufacturer
   
    };

    init();

    return vm;

    function init()
    {
        vm.model = vehicleService.currentManufacturer;
     
    }

    function viewManufacturer(ev)
    {
        manufacturerDialog.viewDialog(vm.model.VehicleManufacturerId, true, ev);
    }

  
}
