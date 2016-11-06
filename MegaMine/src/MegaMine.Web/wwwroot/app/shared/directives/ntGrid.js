'use strict';
angular.module('megamine').directive('ntGrid', ntGrid);
ntGrid.$inject = ['$timeout', 'uiGridConstants', "MegaMine.Shared.Utility", "MegaMine.Shared.Template"];

function ntGrid($timeout, uiGridConstants, utility, template) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            grid: '='
        },
        link: link,
        template: '<md-content layout-padding class="grid-content" ng-style="{\'height\' : grid.height }">'
                        + '<div class="nt-grid" ui-grid="grid.options" ui-grid-resize-columns ui-grid-auto-resize ui-grid-exporter ui-grid-selection ng-class="grid.cssClass"></div>'
                    + '</md-content>'

    };

    function link(scope, element, attrs, nullController, transclude) {
        if (scope.grid === undefined) {
            scope.grid = { options: {} }; // work around as ui-grid is throwing error
        }
        else {
            scope.grid.cssClass = scope.grid.cssClass === undefined ? 'main-grid' : scope.grid.cssClass;
            scope.grid.AddButtonColumn = AddButtonColumn; // this is used in Dashboard to add the button columns
            initialize(scope.grid.options, scope.grid.data);
            AddButtonColumn(scope.grid, scope.grid.primaryField, scope.grid.editClaim, scope.grid.deleteClaim, scope.grid.hideGridButtons);

            setHeight(scope);
        }
    }

    function initialize(options, data) {
        options.enableColumnResizing = true,
        options.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER,
        options.data = data;

        //setting the grid API
        options.onRegisterApi = function (gridApi) {
            options.gridApi = gridApi;
        };
    }

    function AddButtonColumn(grid, primaryField, editClaim, deleteClaim, hideGridButtons) {
        if (primaryField !== undefined) {
            grid.options.columnDefs.push(template.getButtonDefaultColumnDefs(primaryField, editClaim, deleteClaim, hideGridButtons));
        }
    }

    function setHeight(scope) {
        //finding whether the grid is embed in a dashboard. In that case height is set by dashboard
        $timeout(function () {
            if (scope.grid.height !== undefined) {
                scope.dashboardInd = true;
            }
            else {
                scope.dashboardInd = false;
            }
            setGridHeight(scope);
        }, 100);

        scope.$on('window_resize', function () {
            setGridHeight(scope);
        });
    }

    function setGridHeight(scope) {
        var timeoutInterval = 50;
        var bottomOffset = 10;

        if (scope.grid.dialog) {
            timeoutInterval = 250;
            bottomOffset = 40;
        }

        $timeout(function () {
            if (!scope.dashboardInd) {
                scope.grid.height = utility.getContentHeight('grid-content', bottomOffset);
            }
        }, timeoutInterval);
    }

}


