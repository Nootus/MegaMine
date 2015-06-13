'use strict';
angular.module('emine').controller('vehicleList', vehicleList)
vehicleList.$inject = ['$scope', '$window', 'vehicleService', 'vehicleDialog', 'uiGridConstants', 'utility', 'navigation', 'constants'];

function vehicleList($scope, $window, vehicleService, vehicleDialog, uiGridConstants, utility, navigation, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'RegistrationNumber', field: 'RegistrationNumber', displayName: 'Registration #', type:'string', enableHiding: false },
                    { name: 'VehicleType', field: 'VehicleType', displayName: 'Type', type: 'string', enableHiding: false },
                    { name: 'VehicleModel', field: 'VehicleModel', displayName: 'Model', type: 'string', enableHiding: false },
                    { name: 'LastServiceDate', field: 'LastServiceDate', displayName: 'Service Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"', enableHiding: false },
                    { name: 'FuelAverage', field: 'FuelAverage', displayName: 'Fuel Average', type: 'number', enableHiding: false },
                    { name: 'Driver', field: 'Driver', displayName: 'Driver', type: 'string', enableHiding: false },
                    { name: 'VehicleId', field: 'VehicleId', displayName: '', type: 'string', cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.navigateToVehicle(row)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>", cellClass: "text-center", enableHiding: false },
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        gridHeight: '0px',
        navigateToVehicle: navigateToVehicle,
        addVehicle: addVehicle,
    };

    init();

    return vm;

    function init() {
        vm.gridOptions.data = vehicleService.vehicleList;
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

    function navigateToVehicle(row) {
        navigation.gotoVehicle(row.entity.VehicleId);
    }

    function addVehicle(ev) {
        vehicleDialog.viewDialog(0, true, ev);
    }
}
