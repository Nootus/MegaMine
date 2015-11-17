'use strict';
angular.module('emine').directive('ntMultiSelect', ntMultiSelect)
ntMultiSelect.$inject = [];

function ntMultiSelect() {
    return {
        restrict: 'E',  
        scope: {
            ngModel: "=",
            ntItems: '=',
            ntItemText: '@',
        },
        link: link,
        template: '<md-chips ng-model="ngModel"'
                    + ' md-require-match="true" md-on-remove="selectedItemChange($chip, $index)" md-on-add="onTransform($chip)">'
                        + '<md-autocomplete'
                        + ' md-search-text="searchText"'
                        + ' md-items="item in querySearch(searchText)"'
                        + ' md-item-text="item.item"'
                        + ' md-min-length="0"'
                        + '>'
                            + '<md-item-template>'
                                + '<span>{{item.item}}</span>'
                            + '</md-item-template>'
                        + '</md-autocomplete>'
                        + '<md-chip-template>'
                            + '<span>'
                            + '<strong>{{$chip.item}}</strong>'
                            + '</span>'
                        + '</md-chip-template>'
                    + '</md-chips>'
    };

    function link(scope, element, attrs, nullController, transclude) {

        var allItems = angular.copy(scope.ntItems);
        scope.querySearch = function (query) {
            return query ? allItems.filter(queryFilter(query)) : allItems;
        }

        scope.onTransform = function (chip) {
            alert('enter');
        }

        scope.selectedItemChange = function (chip, index) {
            var selectedItem = undefined;
            if (selectedItem === undefined) {
                allItems.splice(0, allItems.length);
                angular.forEach(scope.ntItems, function (item) {
                    var push = true;
                    for (var counter = 0; counter < scope.ngModel.length; counter++) {
                        if (item.key === scope.ngModel[counter].key) {
                            push = false;
                            break;
                        }
                    }
                    if(push)
                        allItems.push(item);
                });
            }

            //var allItems = angular.copy(scope.ntItems);

            //angular.forEach(scope.ngModel, function (ntItem) {
            //    if (item.key == ntItem.key) {
            //        return false;
            //    }
            //});
        }
    }

    function queryFilter(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            return (item.item.toLowerCase().indexOf(lowercaseQuery) === 0);
        };
    }
}
