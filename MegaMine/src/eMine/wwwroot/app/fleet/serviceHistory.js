'use strict';
angular.module('emine').controller('serviceRecord', serviceRecord)
serviceRecord.$inject = ['$scope', '$window', 'vehicleService', 'vehicleServiceDialog', 'gridUtility', 'uiGridConstants', 'constants'];

function serviceRecord($scope, $window, vehicleService, vehicleServiceDialog, gridUtility, uiGridConstants, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'serviceDate', field: 'serviceDate', displayName: 'Service Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'compliant', field: 'compliant', displayName: 'Compliant', type: 'string' },
                    { name: 'serviceCost', field: 'serviceCost', displayName: 'Service Cost', type: 'number' },
                    {
                        name: 'vehicleServiceId', field: 'vehicleServiceId', displayName: '', enableColumnMenu: false,  type: 'string',
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewService(row.entity.vehicleServiceId, false, $event)\" aria-label=\"View\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewService(row.entity.vehicleServiceId, true, $event)\" module=\"Fleet\" claim=\"VehicleServiceEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\" aria-label=\"Edit\"></md-icon> Edit</em-button>",
                        cellClass: "text-center", enableHiding: false
                    },
        ]
    };

    var vm = {
        gridOptions: gridOptions,
        viewService: viewService,
        addService: addService,
        gridHeight: '0px',
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeSubGrid(vm, $scope, vehicleService.vehicle.serviceRecord);
    }

    function addService(ev) {
        vehicleServiceDialog.viewDialog(0, true, ev);
    }

    function viewService(vehicleServiceId, editMode, ev) {
        vehicleServiceDialog.viewDialog(vehicleServiceId, editMode, ev);
    }
}
