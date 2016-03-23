'use strict';
angular.module('megamine').directive('ntToolbar', ntToolbar)
ntToolbar.$inject = [];

function ntToolbar() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            header: '@',
        },
        link: link,
        template: '<md-toolbar>'
                    + '<div class="md-toolbar-tools" layout="row">'
                    + '<h2 flex >{{header}}</h2>'
                    + '<div ng-transclude></div>'
                    + '</div>'
                    + '</md-toolbar>'

    };

    function link(scope, element, attrs, nullController, transclude) {

    }
}
