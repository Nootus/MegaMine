'use strict'

angular.module('emine').factory('gridUtility', gridUtility);
gridUtility.$inject = ['$window', '$timeout', 'toastr', 'uiGridConstants'];

function gridUtility($window, $timeout, toastr, uiGridConstants) {

    var grid = {
        initializeGrid: initializeGrid,
        initializeSubGrid: initializeSubGrid,
    };

    return grid;

    function initializeGrid(vm, scope, model) {
        vm.gridOptions.enableColumnResizing = true,
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER,
        vm.gridOptions.data = model;
        resizeMainGrid(vm);

        angular.element($window).bind('resize', function () {
            vm.gridHeight = getMainGridHeight('main-grid');
        });
        scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeMainGrid(vm, currentHeight) {
        vm.gridHeight = getMainGridHeight('main-grid');
        if (vm.gridHeight !== currentHeight || currentHeight === undefined) {
            $timeout(function () {
                resizeMainGrid(vm, vm.gridHeight);
            }, 50);
        }
    }

    function resizeSubGrid(vm, currentHeight) {
        vm.gridHeight = getSubGridHeight('sub-grid');
        if (vm.gridHeight !== currentHeight || currentHeight === undefined) {
            $timeout(function () {
                resizeSubGrid(vm, vm.gridHeight);
            }, 100);
        }
    }

    function initializeSubGrid(vm, scope, model) {
        vm.gridOptions.enableColumnResizing = true,
        vm.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER,
        vm.gridOptions.data = model;
        resizeSubGrid(vm);

        angular.element($window).bind('resize', function () {
            vm.gridHeight = getSubGridHeight('sub-grid');
        });
        scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }


    function getMainGridHeight(gridClass) {
        return getGridHeight(gridClass, 24);
    }

    function getSubGridHeight(gridClass) {
        return getGridHeight(gridClass, 41);
    }

    function getGridHeight(gridClass, bottomOffset) {
        var viewHeight = angular.element(document.getElementsByClassName('view-content')[0]).offset();
        var contentHeight = angular.element(document.getElementsByClassName('main-content')[0]).height();
        var gridOffset = angular.element(document.getElementsByClassName(gridClass)[0]).offset();
        if (gridOffset !== undefined) {
            var gridHeight = contentHeight - (gridOffset.top) - bottomOffset;
            return gridHeight + 'px';
        }
    }
}

