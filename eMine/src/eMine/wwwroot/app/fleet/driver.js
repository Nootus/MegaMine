﻿'use strict';
angular.module('emine').controller('driver', driver)
driver.$inject = ['$scope', '$window', 'vehicleService', 'driverDialog', 'uiGridConstants', 'utility'];

function driver($scope, $window, vehicleService, driverDialog, uiGridConstants, utility) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'driverName', field: 'driverName', displayName: 'Name', type: 'string', enableHiding: false },
                    { name: 'contact', field: 'contact', displayName: 'Contact', type: 'string', enableHiding: false },
                    { name: 'vehicleDriverId', field: 'vehicleDriverId', displayName: '', enableColumnMenu: false, type: 'string', cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\" module=\"Fleet\" claim=\"DriverEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</em-button>", cellClass: "text-center", enableHiding: false },
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
        vm.gridHeight = utility.getMainGridHeight('main-grid');
    }

    function addDriver(ev) {
        var model = { vehicleDriverId: 0 }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        driverDialog.viewDialog(model, editMode, ev);
    }
}

