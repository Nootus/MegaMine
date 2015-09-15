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
                        + '<em-button class="md-raised md-primary" aria-label="{{buttonText}}" ng-click="ngClick($event)" module="{{claimModule}}" claim="{{claim}}">'
                        + '<md-icon class="icon-button" md-svg-icon="content/images/icons/{{buttonIcon}}.svg"></md-icon>{{buttonText}}'
                        + '</em-button>'
                    + '</em-toolbar>'

    };

    function link(scope, element, attrs, nullController, transclude) {

    }
}
