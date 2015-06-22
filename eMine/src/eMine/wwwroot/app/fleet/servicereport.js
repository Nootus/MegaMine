'use strict';
angular.module('emine').controller('servicereport', servicereport)
manufacturer.$inject = ['$state', 'vehicleService', 'vehicleServiceDialog'];

function servicereport($state, vehicleService, vehicleServiceDialog) {

    var gridOptions =
    {
        enableColumnResizing: true,
        columnDefs: [
                    { name: 'VehicleNumber', field: 'VehicleId', displayName: 'VehicleNumber' },
                    { name: 'Description', field: 'Description', displayName: 'Description' },
                    { name: 'ServiceDate', field: 'ServiceDate', displayName: 'ServiceDate' },
                    { name: 'Compliant', field: 'Compliant', displayName: 'Compliant' },
                    { name: 'ServiceCost', field: 'ServiceCost', displayName: 'ServiceCost' },
                     {
                         name: 'VehicleServiceId', field: 'VehicleServiceId', displayName: '', enableColumnMenu: false,
                         cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewService(row.entity.VehicleServiceId, false, $event)\" aria-label=\"View\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>",
                         cellClass: "text-center", enableHiding: false
                     },

        ]
    };

    var vm =
   {
       model: {},
       gridOptions: gridOptions,
       viewService: viewService,
       getReport: getReport,
   };

    init();

    return vm;

    function init()
    {
        vm.model = vehicleService.manufacturer;
        vm.gridOptions.data = vehicleService.modelsList;
    }

    function viewService(vehicleServiceId, editMode, ev) 
    {

        vehicleServiceDialog.viewDialog(vehicleServiceId, editMode, ev);
    }

    function getReport(ev)
    {
        vehicleService.getServiceReport(vm.model.VehicleId, vm.model.StartDate, vm.model.EndDate)
        .success(function (data) {
            vm.gridOptions.data = data;
        })
    }

    

}
