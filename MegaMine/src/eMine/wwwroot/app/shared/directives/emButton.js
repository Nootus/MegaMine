'use strict';
angular.module('emine').directive('emButton', emButton)
emButton.$inject = ['profile'];

function emButton(profile) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            class: '@',
            title: '@',
            module: '@',
            claim: '@',
            hide: '@'
        },
        link: link,
        template: '<md-button title="{{title}}" class="{{class}}" ng-hide="hide" aria-label="{{title}}"><ng-transclude />'
                    + '</md-button>'

    };

    function link(scope, element, attrs, nullController, transclude) {
        if (scope.module === undefined || scope.claim === undefined) {
            scope.hide = false;
        }
        else {
            scope.hide = !profile.isAuthorized(scope.module, scope.claim);
        }
    }
}
