'use strict';
angular.module('emine').directive('ntToolbarButton', ntToolbarButton)
ntToolbarButton.$inject = [];

function ntToolbarButton() {
    return {
        restrict: 'E',
        scope: {
            title: '@',
            buttonText: '@',
            buttonIcon: '@',
            claimModule: '@',
            claim: '@',
            ngClick: '='
        },
        link: link,
        template: '<em-toolbar title="{{title}}" class="title">'
                        + '<nt-button ng-click="ngClick($event)" button-icon="{{buttonIcon}}" button-text="{{buttonText}}" module="{{claimModule}}" claim="{{claim}}"></nt-button>'
                    + '</em-toolbar>'

    };

    function link(scope, element, attrs, nullController, transclude) {

    }
}
