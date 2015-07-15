'use strict';
angular.module('emine').controller('serviceRecord', serviceRecord)
serviceRecord.$inject = ['$scope', '$window', 'vehicleService', 'vehicleServiceDialog', 'utility', 'uiGridConstants', 'constants'];

function serviceRecord($scope, $window, vehicleService, vehicleServiceDialog, utility, uiGridConstants, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'ServiceDate', field: 'ServiceDate', displayName: 'Service Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'Compliant', field: 'Compliant', displayName: 'Compliant', type: 'string' },
                    { name: 'ServiceCost', field: 'ServiceCost', displayName: 'Service Cost', type: 'number' },
                    {
                        name: 'VehicleServiceId', field: 'VehicleServiceId', displayName: '', enableColumnMenu: false,  type: 'string',
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewService(row.entity.VehicleServiceId, false, $event)\" aria-label=\"View\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewService(row.entity.VehicleServiceId, true, $event)\" module=\"Fleet\" claim=\"VehicleServiceEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\" aria-label=\"Edit\"></md-icon> Edit</em-button>",
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
        vm.gridOptions.data = vehicleService.vehicle.ServiceRecord;
        resizeGrid();

        angular.element($window).bind('resize', function () {
            resizeGrid();
        });
        $scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeGrid() {
        vm.gridHeight = utility.getSubGridHeight('sub-grid');
    }

    function addService(ev) {
        vehicleServiceDialog.viewDialog(0, true, ev);
    }

    function viewService(vehicleServiceId, editMode, ev) {
        vehicleServiceDialog.viewDialog(vehicleServiceId, editMode, ev);
    }
}
