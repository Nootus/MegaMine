'use strict';
angular.module('emine').controller('yard', yard)
yard.$inject = ['$scope', '$window', 'quarryService', 'yardDialog', 'uiGridConstants', 'utility'];

function yard($scope, $window, quarryService, yardDialog, uiGridConstants, utility) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'yardName', field: 'YardName', displayName: 'Name', type: 'string', enableHiding: false },
                    { name: 'location', field: 'Location', type: 'string', displayName: 'Location', enableHiding: false },
                    { name: 'yardId', field: 'YardId', displayName: '', enableColumnMenu: false, type: 'string', cellTemplate: "<span ng-hide=\"{{row.entity.QuarryId !== null}}\"><md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\" module=\"Quarry\" claim=\"YardEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</md-button><span>", cellClass: "text-center", enableHiding: false },
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        gridHeight: '0px',
        viewDialog: viewDialog,
        addYard: addYard
    };

    init();

    return vm;

    function init() {
        vm.gridOptions.data = quarryService.yards;
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

    function addYard(ev) {
        var model = { YardId: 0 }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        yardDialog.viewDialog(model, editMode, ev);
    }
}

