'use strict'

angular.module('megamine').factory('gridUtility', gridUtility);
gridUtility.$inject = ['$timeout', 'toastr', 'utility', 'uiGridConstants'];

function gridUtility($timeout, toastr, utility, uiGridConstants) {

    var grid = {
        initializeGrid: initializeGrid,
        initializeSubGrid: initializeSubGrid,
        initializeDialogGrid: initializeDialogGrid,
    };

    return grid;

    function initializeGrid(gridOptions, model) {
        initialize(gridOptions, model, 'main-content', 'main-grid', 24);
    }

    function initializeSubGrid(gridOptions, model) {
        initialize(gridOptions, model, 'main-content', 'sub-grid', 41);
    }

    function initializeDialogGrid(gridOptions, model) {
        initialize(gridOptions, model, 'dialog', 'dialog-grid', 100);
    }

    function initialize(gridOptions, model, contentClass, gridClass, bottomOffset) {
        gridOptions.enableColumnResizing = true,
        gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER,
        gridOptions.data = model;
        //resizeGrid(gridOptions, contentClass, gridClass, bottomOffset);

        //setting the grid API
        gridOptions.onRegisterApi = function(gridApi){
            gridOptions.gridApi = gridApi;
        };
    }

    //function resizeGrid(gridOptions, contentClass, gridClass, bottomOffset, currentHeight) {
    //    gridOptions.height = utility.getContentHeight(contentClass, gridClass, bottomOffset);
    //    if (gridOptions.height !== currentHeight || currentHeight === undefined) {
    //        $timeout(function () {
    //            resizeGrid(gridOptions, contentClass, gridClass, bottomOffset, gridOptions.height);
    //        }, 50);
    //    }
    //}

}

