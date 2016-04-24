'use strict';
angular.module('megamine').directive('ntToolbarButton', ntToolbarButton)
ntToolbarButton.$inject = [];

function ntToolbarButton() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            header: '@',
            buttonText: '@',
            buttonIcon: '@',
            buttonClick: '&',
            claim: '@'
        },
        link: link,
        template: '<nt-toolbar header="{{header}}">'
                        + '<span ng-transclude>'
                        + '<nt-button type="command-bar" icon-css="{{buttonIcon}}" tool-tip="{{buttonText}}" text="{{buttonText}}" ng-click="buttonClick({$event: $event})" claim="{{claim}}"></nt-button>'
                        + '</span>'
                    + '</nt-toolbar>'

    };

    function link(scope, element, attrs, nullController, transclude) {

    }
}
