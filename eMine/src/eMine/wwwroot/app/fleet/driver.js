'use strict';
angular.module('emine').controller('driver', driver)
driver.$inject = ['$scope', '$window', 'vehicleService', 'driverDialog', 'uiGridConstants', 'utility'];

function driver($scope, $window, vehicleService, driverDialog, uiGridConstants, utility) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'DriverName', field: 'DriverName', displayName: 'Name', type: 'string', enableHiding: false },
                    { name: 'Contact', field: 'Contact', displayName: 'Contact', type: 'string', enableHiding: false },
                    { name: 'VehicleDriverId', field: 'VehicleDriverId', displayName: '', type: 'string', cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</md-button>", cellClass: "text-center", enableHiding: false },
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        gridHeight: '0px',
        viewDialog: viewDialog,
        addDriver: addDriver
    };

    init();

    return vm;

    function init() {
        vm.gridOptions.data = vehicleService.drivers;
        resizeGrid();

        angular.element($window).bind('resize', function () {
            resizeGrid();
        });
        $scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeGrid() {
        vm.gridHeight = utility.getGridHeight('main-grid');
    }

    function addDriver(ev) {
        var model = { VehicleDriverId: 0 }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        driverDialog.viewDialog(model, editMode, ev);
    }
}

