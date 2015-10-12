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
        getListItem: getListItem,
        getItem: getItem,
        deleteProperties: deleteProperties,
        isEmpty: isEmpty,
        isUndefined: isUndefined
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

    function isEmpty(value) {
        return isUndefined(value) || value === '' || value === null || value !== value;
    };

    function isUndefined(value) {
        return typeof value === 'undefined';
    }
};

