'use strict';
angular.module('emine').controller('quarry', quarry)
quarry.$inject = ['$scope', '$window', 'quarryService', 'quarryDialog', 'uiGridConstants', 'utility'];

function quarry($scope, $window, quarryService, quarryDialog, uiGridConstants, utility) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'quarryName', field: 'quarryName', displayName: 'Name', type: 'string', enableHiding: false },
                    { name: 'colour', field: 'colours', type: 'string', displayName: 'Colour', enableHiding: false },
                    { name: 'location', field: 'location', type: 'string', displayName: 'Location', enableHiding: false },
                    { name: 'quarryId', field: 'quarryId', displayName: '', enableColumnMenu: false, type: 'string', cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\" module=\"Quarry\" claim=\"QuarryEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</md-button>", cellClass: "text-center", enableHiding: false },
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        gridHeight: '0px',
        viewDialog: viewDialog,
        addQuarry: addQuarry
    };

    init();

    return vm;

    function init() {
        vm.gridOptions.data = quarryService.quarries;
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

    function addQuarry(ev) {
        var model = { quarryId: 0 }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        quarryDialog.viewDialog(model, editMode, ev);
    }
}

