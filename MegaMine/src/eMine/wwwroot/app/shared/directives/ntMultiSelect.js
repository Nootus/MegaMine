'use strict';
angular.module('emine').directive('ntMultiSelect', ntMultiSelect)
ntMultiSelect.$inject = [];

function ntMultiSelect() {
    return {
        restrict: 'E',  
        scope: {
            ngModel: "=",
            ntSelectedItem: "=",
            ntItems: '=',
            ntItemText: '=',
        },
        link: link,
        template: '<md-chips ng-model="ngModel"'
                    + ' md-require-match="true">'
                        + '<md-autocomplete md-selected-item="ntSelectedItem"'
                        + ' md-items="item in ntItems"'
                        + ' md-item-text="item"'
                        + ' md-min-length="0"'
                        + '>'
                            + '<md-item-template>'
                                + '<span>{{item}}</span>'
                            + '</md-item-template>'
                        + '</md-autocomplete>'
                        + '<md-chip-template>'
                            + '<span>'
                            + '<strong>{{$chip}}</strong>'
                            + '</span>'
                        + '</md-chip-template>'
                    + '</md-chips>'
    };

    function link(scope, element, attrs, nullController, transclude) {

    }
}
