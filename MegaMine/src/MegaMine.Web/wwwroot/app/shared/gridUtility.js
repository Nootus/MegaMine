'use strict'

angular.module('megamine').factory('gridUtility', gridUtility);
gridUtility.$inject = ['$window', '$timeout', 'toastr', 'utility', 'uiGridConstants'];

function gridUtility($window, $timeout, toastr, utility, uiGridConstants) {

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
        initialize(gridOptions, scope, model, 'dialog', 'dialog-grid', 100);
    }

    function initialize(gridOptions, scope, model, contentClass, gridClass, bottomOffset) {
        gridOptions.enableColumnResizing = true,
        gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER,
        gridOptions.data = model;
        //resizeGrid(gridOptions, contentClass, gridClass, bottomOffset);

        //setting the grid API
        gridOptions.onRegisterApi = function(gridApi){
            gridOptions.gridApi = gridApi;
        };


        //angular.element($window).bind('resize', function () {
        //    gridOptions.height = utility.getContentHeight(contentClass, gridClass, bottomOffset);
        //});
        //scope.$on('$destroy', function (e) {
        //    angular.element($window).unbind('resize');
        //});
    }

    function resizeGrid(gridOptions, contentClass, gridClass, bottomOffset, currentHeight) {
        gridOptions.height = utility.getContentHeight(contentClass, gridClass, bottomOffset);
        if (gridOptions.height !== currentHeight || currentHeight === undefined) {
            $timeout(function () {
                resizeGrid(gridOptions, contentClass, gridClass, bottomOffset, gridOptions.height);
            }, 50);
        }
    }

}

