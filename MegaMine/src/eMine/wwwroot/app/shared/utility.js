'use strict'

angular.module('emine').factory('utility', utility);
utility.$inject = ['$window', 'toastr', 'uiGridConstants'];

function utility($window, toastr, uiGridConstants) {

    var virtualDirectory = window.virtualDirectory || '';

    var vm = {
        virtualDirectory: virtualDirectory,
        routePath: routePath,
        showInfo: showInfo,
        showError: showError,
        initializeGrid: initializeGrid,
        getGridHeight: getGridHeight,
        getMainGridHeight: getMainGridHeight,
        getSubGridHeight: getSubGridHeight,
        getListItem: getListItem,
        getItem: getItem
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
        setGridHeight(vm);

        angular.element($window).bind('resize', function () {
            setGridHeight(vm);
        });
        scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }
    function setGridHeight(vm) {
        vm.gridHeight = getMainGridHeight('main-grid');
    }


    function getMainGridHeight(gridClass) {
        return getGridHeight(gridClass, 24);
    }

    function getSubGridHeight(gridClass) {
        return getGridHeight(gridClass, 41);
    }

    function getGridHeight(gridClass, bottomOffset) {
        var contentOffset = angular.element(document.getElementsByClassName('main-content')).offset();
        var contentHeight = angular.element(document.getElementsByClassName('main-content')[0]).height();
        var gridOffset = angular.element(document.getElementsByClassName(gridClass)).offset();
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
};

