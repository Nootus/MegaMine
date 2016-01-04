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
            claimModule: '@',
            claim: '@'
        },
        link: link,
        template: '<nt-toolbar title="{{title}}" class="title">'
                        + '<span ng-transclude>'
                        +       '<nt-button ng-click="buttonClick({$event: $event})" button-icon="{{buttonIcon}}" button-text="{{buttonText}}" module="{{claimModule}}" claim="{{claim}}"></nt-button>'
                        + '</span>'
                    + '</nt-toolbar>'

    };

    function link(scope, element, attrs, nullController, transclude) {

    }
}
