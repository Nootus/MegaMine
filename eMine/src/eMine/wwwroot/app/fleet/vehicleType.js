'use strict';
angular.module('emine').controller('vehicleType', vehicleType)
vehicleType.$inject = ['$scope', '$window', 'vehicleService', 'vehicleTypeDialog', 'uiGridConstants', 'utility'];

function vehicleType($scope, $window, vehicleService, vehicleTypeDialog, uiGridConstants, utility) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'VehicleTypeName', field: 'VehicleTypeName', displayName: 'Vehicle Type', type: 'string', enableHiding: false },
                    { name: 'VehicleTypeDescription', field: 'VehicleTypeDescription', type: 'string', displayName: 'Description', enableHiding: false },
                    { name: 'VehicleTypeId', field: 'VehicleTypeId', displayName: '', type: 'string', cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</md-button>", cellClass: "text-center", enableHiding: false },
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        gridHeight: '0px',
        viewDialog: viewDialog,
        addVehicleType: addVehicleType
    };

    init();

    return vm;

    function init() {
        vm.gridOptions.data = vehicleService.vehicleTypes;
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

    function addVehicleType(ev) {
        var model = { VehicleTypeId: 0 }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        vehicleTypeDialog.viewDialog(model, editMode, ev);
    }
}

