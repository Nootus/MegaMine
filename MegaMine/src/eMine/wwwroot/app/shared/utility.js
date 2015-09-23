'use strict'

angular.module('emine').factory('utility', utility);
utility.$inject = ['$window', '$timeout', 'toastr', 'uiGridConstants'];

function utility($window, $timeout, toastr, uiGridConstants) {

    var virtualDirectory = window.virtualDirectory || '';

    var vm = {
        virtualDirectory: virtualDirectory,
        routePath: routePath,
        showInfo: showInfo,
        showError: showError,
        initializeGrid: initializeGrid,
        initializeSubGrid: initializeSubGrid,
        getSubGridHeight: getSubGridHeight,
        getListItem: getListItem,
        getItem: getItem,
        deleteProperties: deleteProperties
    };

    return vm;

    function routePath(path) {
        return window.virtualDirectory + "/" + path;
    }

    function showInfo(message) {
        if (message !== null && message !== "")
            toastr.info(message);
    }

    function showError(message) {
        toastr.error(message);
    }

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
            }, 100);
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
        var contentOffset = angular.element(document.getElementsByClassName('main-content')[0]).offset();
        var contentHeight = angular.element(document.getElementsByClassName('main-content')[0]).height();
        var gridOffset = angular.element(document.getElementsByClassName(gridClass)[0]).offset();
        //var gdOffset = angular.element(document.getElementById(gridClass)).offset();
        if (gridOffset !== undefined) {
            var gridHeight = contentHeight - (gridOffset.top) - bottomOffset;
            return gridHeight + 'px';
        }
    }

    function getListItem(list, key) {
        var item;
        for (var counter = 0; counter < list.length; counter++) {
            if (key === list[counter].key) {
                item = list[counter].item;
                break;
            }
        }

        return item;
    }

    function getItem(list, key, keyField, itemField) {
        var item;
        for (var counter = 0; counter < list.length; counter++) {
            if (key === list[counter][keyField]) {
                item = list[counter][itemField];
                break;
            }
        }

        return item;
    }

    function deleteProperties(model) {
        angular.forEach(model, function (value, property) {
            delete model[property];
        });
    }
};

