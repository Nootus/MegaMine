'use strict'

angular.module('megamine').factory('utility', utility);
utility.$inject = ['$window', '$timeout', 'toastr', 'uiGridConstants'];

function utility($window, $timeout, toastr, uiGridConstants) {

    var virtualDirectory = window.virtualDirectory || '';

    var util = {
        virtualDirectory: virtualDirectory,
        getTemplateUrl: getTemplateUrl,
        routePath: routePath,
        showInfo: showInfo,
        showError: showError,
        getListItem: getListItem,
        getItem: getItem,
        deleteProperties: deleteProperties,
        isEmpty: isEmpty,
        isUndefined: isUndefined,
        extend: extend,
        getContentHeight: getContentHeight
    };

    return util;

    function routePath(path) {
        return util.virtualDirectory + '/' + path;
    }

    function getTemplateUrl(url) {
        return util.virtualDirectory + '/app/' + url;
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

    function extend(dest, source){
        dest.splice(0, dest.length);
        angular.extend(dest, source);
    }

    function getContentHeight(containerClass, contentClass, bottomOffset) {
        var containerHeight = angular.element(document.getElementsByClassName(containerClass)[0]).height();
        var contentOffset = angular.element(document.getElementsByClassName(contentClass)[0]).offset();
        if (contentOffset !== undefined) {
            var contentHeight = containerHeight - (contentOffset.top) - bottomOffset;
            return contentHeight + 'px';
        }
    }

}

