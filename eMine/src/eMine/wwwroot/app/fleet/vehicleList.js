'use strict';
angular.module('emine').controller('vehicleList', vehicleList)
vehicleList.$inject = ['$scope', '$window', 'vehicleService', 'vehicleDialog', 'uiGridConstants', 'utility', 'navigation', 'constants'];

function vehicleList($scope, $window, vehicleService, vehicleDialog, uiGridConstants, utility, navigation, constants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'registrationNumber', field: 'registrationNumber', displayName: 'Registration #', type:'string', enableHiding: false },
                    { name: 'vehicleType', field: 'vehicleType', displayName: 'Type', type: 'string', enableHiding: false },
                    { name: 'vehicleModel', field: 'vehicleModel', displayName: 'Model', type: 'string', enableHiding: false },
                    { name: 'lastServiceDate', field: 'lastServiceDate', displayName: 'Service Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"', enableHiding: false },
                    { name: 'fuelAverage', field: 'fuelAverage', displayName: 'Fuel Average', type: 'number', enableHiding: false },
                    { name: 'driver', field: 'driver', displayName: 'Driver', type: 'string', enableHiding: false },
                    { name: 'vehicleId', field: 'vehicleId', displayName: '', enableColumnMenu: false, type: 'string', cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.navigateToVehicle(row)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>", cellClass: "text-center", enableHiding: false },
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
        vm.gridHeight = utility.getMainGridHeight('main-grid');
    }

    function navigateToVehicle(row) {
        navigation.gotoVehicle(row.entity.vehicleId);
    }

    function addVehicle(ev) {
        vehicleDialog.viewDialog(0, true, ev);
    }
}
