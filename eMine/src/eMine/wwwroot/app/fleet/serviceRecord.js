'use strict';
angular.module('emine').controller('serviceRecord', serviceRecord)
serviceRecord.$inject = ['vehicleService', 'vehicleServiceDialog', 'uiGridConstants'];

function serviceRecord(vehicleService, vehicleServiceDialog, uiGridConstants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'ServiceDate', field: 'ServiceDate', displayName: 'Service Date', type: 'date', cellFilter: 'date:"dd/MM/yyyy"' },
                    { name: 'Compliant', field: 'Compliant', displayName: 'Compliant', type: 'string' },
                    { name: 'ServiceCost', field: 'ServiceCost', displayName: 'Service Cost', type: 'number' },
                    {
                        name: 'VehicleServiceId', field: 'VehicleServiceId', displayName: '', enableColumnMenu: false,  type: 'string',
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewService(row.entity.VehicleServiceId, false, $event)\" aria-label=\"View\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewService(row.entity.VehicleServiceId, true, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\" aria-label=\"Edit\"></md-icon> Edit</md-button>",
                        cellClass: "text-center", enableHiding: false
                    },
        ]
    };

    var vm = {
        gridOptions: gridOptions,
        viewService: viewService,
        addService: addService,
    };

    init();

    return vm;

    function init() {
        vm.gridOptions.data = vehicleService.vehicle.ServiceRecord;
    }

    function addService(ev) {
        vehicleServiceDialog.viewDialog(0, true, ev);
    }

    function viewService(vehicleServiceId, editMode, ev) {
        vehicleServiceDialog.viewDialog(vehicleServiceId, editMode, ev);
    }
}
