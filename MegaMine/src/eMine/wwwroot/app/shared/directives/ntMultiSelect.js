'use strict';
angular.module('megamine').directive('ntMultiSelect', ntMultiSelect)
ntMultiSelect.$inject = [];

function ntMultiSelect() {
    return {
        restrict: 'E',  
        scope: {
            ngModel: "=",
            ntItems: '=',
            ntItemText: '@',
            ntItemValue: '@',
            label: '@'
        },
        link: link,
        template: '<label class="label_header">{{label}}</label><md-chips ng-model="ngModel"'
                    + ' md-require-match="true" md-on-remove="itemChange($chip, $index)" md-on-add="itemChange($chip, $index)">'
                        + '<md-autocomplete'
                        + ' md-search-text="searchText"'
                        + ' md-items="item in querySearch(searchText)"'
                        + ' md-min-length="0"'
                        + '>'
                            + '<md-item-template>'
                                + '<span>{{item[ntItemText]}}</span>'
                            + '</md-item-template>'
                        + '</md-autocomplete>'
                        + '<md-chip-template>'
                            + '<span>{{$chip[ntItemText]}}</span>'
                        + '</md-chip-template>'
                    + '</md-chips>'
    };

    function link(scope, element, attrs, nullController, transclude) {

        scope.ntItemText = scope.ntItemText === undefined ? "item" : scope.ntItemText;
        scope.ntItemValue = scope.ntItemValue === undefined ? "key" : scope.ntItemValue;

        var allItems = angular.copy(scope.ntItems);

        scope.querySearch = function(query) {
            return query ? allItems.filter(queryFilter(query, scope.ntItemText)) : allItems;
        }
        
        scope.itemChange = function(chip, index) {
            var selectedItem = undefined;
            if (selectedItem === undefined) {
                allItems.splice(0, allItems.length);
                angular.forEach(scope.ntItems, function (item) {
                    var push = true;
                    for (var counter = 0; counter < scope.ngModel.length; counter++) {
                        if (item[scope.ntItemValue] === scope.ngModel[counter][scope.ntItemValue]) {
                            push = false;
                            break;
                        }
                    }
                    if (push)
                        allItems.push(item);
                });
            }
        }
        
    }


    function queryFilter(query, ntItemText) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            return (item[ntItemText].toLowerCase().indexOf(lowercaseQuery) === 0);
        }
    }

}
