'use strict';
angular.module('emine').directive('ntButton', ntButton)
ntButton.$inject = ['profile'];

function ntButton(profile) {
    return {
        restrict: 'E',
        scope: {
            class: '@',
            buttonIcon: '@',
            buttonText: '@',
            module: '@',
            claim: '@',
            hide: '@'
        },
        link: link,
        template: '<md-button class="{{class}}" ng-hide="hide" aria-label="{{buttonText}}">'
                    + ' <md-icon class="icon-button" md-svg-icon="content/images/icons/{{buttonIcon}}.svg"></md-icon>{{buttonText}}'
                    + '</md-button>'

    };

    function link(scope, element, attrs, nullController) {
        if (scope.module === undefined || scope.claim === undefined || scope.module === '' || scope.claim === '') {
            scope.hide = false;
        }
        else {
            scope.hide = !profile.isAuthorized(scope.module, scope.claim);
        }

        scope.class = scope.class === undefined ? 'md-raised md-primary' : scope.class;
    }
}
