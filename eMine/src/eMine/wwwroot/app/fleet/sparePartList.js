'use strict';
angular.module('emine').controller('sparePartList', sparePartList)
sparePartList.$inject = ['$scope', '$window', 'vehicleService', 'sparePartDialog', 'uiGridConstants', 'utility', 'navigation'];

function sparePartList($scope, $window, vehicleService, sparePartDialog, uiGridConstants, utility, navigation) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Part Name', type: 'string', enableHiding: false },
                    { name: 'description', field: 'description', displayName: 'Description', type: 'string', enableHiding: false },
                    { name: 'quantity', field: 'quantity', displayName: 'Available Quantity', type: 'number', enableHiding: false },
                    {
                        name: 'sparePartId', field: 'sparePartId', displayName: '', enableColumnMenu: false, type: 'string',
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.navigateToSparePart(row)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>",
                        cellClass: "text-center", enableHiding: false
                    },
        ]
    };

    var vm = {
        gridOptions: gridOptions,
        gridHeight: '0px',
        navigateToSparePart: navigateToSparePart,
        addSparePart: addSparePart,
        model: {}
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
        vm.gridHeight = utility.getMainGridHeight('main-grid');
    }

    function navigateToSparePart(row) {
        navigation.gotoSparePart(row.entity.sparePartId);
    }

    function addSparePart(ev, editMode)
    {
        sparePartDialog.viewDialog(0, editMode, ev);
    }
}
