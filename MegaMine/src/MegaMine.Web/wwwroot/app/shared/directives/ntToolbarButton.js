'use strict';
angular.module('megamine').directive('ntToolbarButton', ntToolbarButton)
ntToolbarButton.$inject = [];

function ntToolbarButton() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@',
            buttonText: '@',
            buttonIcon: '@',
            buttonClick: '&',
            claim: '@'
        },
        link: link,
        template: '<nt-toolbar title="{{title}}" class="title">'
                        + '<span ng-transclude>'
                        +       '<nt-old-button ng-click="buttonClick({$event: $event})" button-icon="{{buttonIcon}}" button-text="{{buttonText}}" claim="{{claim}}"></nt-button>'
                        + '</span>'
                    + '</nt-toolbar>'

    };

    function link(scope, element, attrs, nullController, transclude) {

    }
}
