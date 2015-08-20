'use strict';
angular.module('emine').controller('fuel', fuel)
fuel.$inject = ['$scope', '$window', 'vehicleService', 'fuelDialog', 'utility', 'uiGridConstants', 'constants'];

function fuel($scope, $window, vehicleService, fuelDialog, utility, uiGridConstants, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'fuelDate', field: 'fuelDate', displayName: 'Fuel Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quantity', field: 'quantity', displayName: 'Quantity', type: 'number' },
                    { name: 'odometer', field: 'odometer', displayName: 'Odometer', type: 'number' },
                    {
                        name: 'vehicleFuelId', field: 'vehicleFuelId', displayName: '', enableColumnMenu: false, type: 'string',
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\" aria-label=\"View\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\" module=\"Fleet\" claim=\"VehicleFuelEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\" aria-label=\"Edit\"></md-icon> Edit</em-button>",
                        cellClass: "text-center", enableHiding: false
                    },
        ]
    };

    var vm = {
        vehicleId: 0,
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addFuel: addFuel,
        gridHeight: '0px',
    };

    init();

    return vm;

    function init() {
        vm.vehicleId = vehicleService.vehicle.vehicleId;
        vm.gridOptions.data = vehicleService.fuelList;
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

    function addFuel(ev) {
        var model = { vehicleFuelId: 0, vehicleId: vm.vehicleId }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        fuelDialog.viewDialog(model, editMode, ev);
    }
}
