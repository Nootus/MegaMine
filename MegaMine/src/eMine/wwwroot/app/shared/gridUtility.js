'use strict'

angular.module('megamine').factory('gridUtility', gridUtility);
gridUtility.$inject = ['$window', '$timeout', 'toastr', 'uiGridConstants'];

function gridUtility($window, $timeout, toastr, uiGridConstants) {

    var grid = {
        initializeGrid: initializeGrid,
        initializeSubGrid: initializeSubGrid,
        initializeDialogGrid: initializeDialogGrid,
    };

    return grid;

    function initializeGrid(gridOptions, scope, model) {
        initialize(gridOptions, scope, model, 'main-content', 'main-grid', 24);
    }

    function initializeSubGrid(gridOptions, scope, model) {
        initialize(gridOptions, scope, model, 'main-content', 'sub-grid', 41);
    }

    function initializeDialogGrid(gridOptions, scope, model) {
        initialize(gridOptions, scope, model, 'dialog', 'dialog-grid', 75);
    }

    function initialize(gridOptions, scope, model, contentClass, gridClass, bottomOffset) {
        gridOptions.enableColumnResizing = true,
        gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER,
        gridOptions.data = model;
        resizeGrid(gridOptions, contentClass, gridClass, bottomOffset);

        //setting the grid API
        gridOptions.onRegisterApi = function(gridApi){
            gridOptions.gridApi = gridApi;
        };


        angular.element($window).bind('resize', function () {
            gridOptions.gridHeight = getGridHeight(contentClass, gridClass, bottomOffset);
        });
        scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeGrid(gridOptions, contentClass, gridClass, bottomOffset, currentHeight) {
        gridOptions.gridHeight = getGridHeight(contentClass, gridClass, bottomOffset);
        if (gridOptions.gridHeight !== currentHeight || currentHeight === undefined) {
            $timeout(function () {
                resizeGrid(gridOptions, contentClass, gridClass, bottomOffset, gridOptions.gridHeight);
            }, 50);
        }
    }

    function getGridHeight(contentClass, gridClass, bottomOffset) {
        //var viewHeight = angular.element(document.getElementsByClassName('view-content')[0]).offset();
        var contentHeight = angular.element(document.getElementsByClassName('main-content')[0]).height();
        var gridOffset = angular.element(document.getElementsByClassName(gridClass)[0]).offset();
        if (gridOffset !== undefined) {
            var gridHeight = contentHeight - (gridOffset.top) - bottomOffset;
            return gridHeight + 'px';
        }
    }
}

