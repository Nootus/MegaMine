'use strict';
angular.module('emine').controller('sparePartList', sparePartList)
sparePartList.$inject = ['$scope', '$window', 'vehicleService', 'sparePartDialog', 'uiGridConstants', 'utility', 'navigation'];

function sparePartList($scope, $window, vehicleService, sparePartDialog, uiGridConstants, utility, navigation) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'Name', field: 'Name', displayName: 'Part Name', type: 'string', enableHiding: false },
                    { name: 'Description', field: 'Description', displayName: 'Description', type: 'string', enableHiding: false },
                    { name: 'Quantity', field: 'Quantity', displayName: 'Available Quantity', type: 'number', enableHiding: false },
                    { name: 'SparePartId', field: 'SparePartId', displayName: '', type: 'string', cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.navigateToSparePart(row)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>", cellClass: "text-center", enableHiding: false },
        ]
    };

    //{ name: 'LastServiceDate', field: 'LastServiceDate', displayName: 'Last Order Date', cellFilter: 'date:"dd/MM/yyyy"', enableHiding: false },

    var vm = {
        gridOptions: gridOptions,
        gridHeight: '0px',
        navigateToSparePart: navigateToSparePart,
        addSparePart: addSparePart,
    };

    init();

    return vm;

    function init() {
        vm.gridOptions.data = vehicleService.sparePartList;
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

    function navigateToSparePart(row) {
        navigation.gotoSparePart(row.entity.SparePartId);
    }

    function addSparePart(ev) {
        sparePartDialog.viewDialog(0, ev);
    }
}
