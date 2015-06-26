'use strict'

angular.module('emine').factory('utility', utility);
utility.$inject = ['toastr'];

function utility(toastr) {

    var virtualDirectory = window.virtualDirectory || '';

    var vm = {
        virtualDirectory: virtualDirectory,
        routePath: routePath,
        showInfo: showInfo,
        showError: showError,
        getGridHeight: getGridHeight,
        getMainGridHeight: getMainGridHeight,
        getSubGridHeight: getSubGridHeight,
        getListItem: getListItem
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
            if (key === list[counter].Key) {
                item = list[counter].Item;
                break;
            }
        }

        return item;
    }
};

