'use strict';
angular.module('emine').controller('manufacturerList', manufacturerList)
manufacturerList.$inject = ['$scope', '$window', 'vehicleService', 'manufacturerDialog', 'uiGridConstants', 'utility', 'navigation'];

function manufacturerList($scope, $window,vehicleService, manufacturerDialog, uiGridConstants, utility, navigation) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Name', type: 'string', enableHiding: false },
                    { name: 'description', field: 'description', displayName: 'Description', type: 'string', enableHiding: false },
                    { name: 'manufacturerId', field: 'manufacturerID', displayName: '', enableColumnMenu: false, type: 'string', cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.navigateToManufacturer(row)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button> ", cellClass: "text-center", enableHiding: false },
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        gridHeight: '0px',
        navigateToManufacturer: navigateToManufacturer,
        addManufacturer: addManufacturer,
        editManufucturer: editManufucturer,
    };

    init();

    return vm;

    function init() {
        vm.gridOptions.data = vehicleService.manufacturerList;
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

    function navigateToManufacturer(row) {
        navigation.gotomanufacturer(row.entity.vehicleManufacturerId);
    }

    function addManufacturer(ev)
    {
        manufacturerDialog.viewDialog(0, true, ev);
    }

    function editManufucturer(row)
    {
        manufacturerDialog.editDialog(row.entity, true, 0);
    }
}
