'use strict';
angular.module('emine').controller('manufacturer', manufacturer)
manufacturer.$inject = ['$state', 'vehicleService', 'vehicleModelDialog', 'manufacturerDialog'];

function manufacturer($state, vehicleService, vehicleModelDialog, manufacturerDialog) {

    var gridOptions = {
        enableColumnResizing: true,
        columnDefs: [
                    { name: 'Name', field: 'Name', displayName: 'Name' },
                    { name: 'Description', field: 'Description', displayName: 'Description' },
                     {
                         name: 'SparePartOrderId', field: 'SparePartOrderId', displayName: '', enableColumnMenu: false,
                         cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewModel(row.entity, false, $event)\" aria-label=\"View\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.editModel(row.entity, true, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\" aria-label=\"Edit\"></md-icon> Edit</md-button>",
                         cellClass: "text-center", enableHiding: false
                     },
                    
        ]
    };

    var vm = {
        model: {},
        gridOptions: gridOptions,
        addModel: addModel,
        viewModel: viewModel,
        editModel: editModel,
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

    function viewModel(model, editMode, ev) {
        model.VehicleModelId = 0;
        vehicleModelDialog.viewDialog(model, editMode, ev);
    }

    function editModel(model, editMode, ev) {
     
        vehicleModelDialog.viewDialog(model, editMode, ev);
    }

}
