'use strict';
angular.module('emine').directive('emButton', emButton)
emButton.$inject = ['profile'];

function emButton(profile) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            class: '@',
            module: '@',
            claim: '@',
            hide: '@'
        },
        link: link,
        template: '<md-button class="{{class}}" ng-hide="hide"><ng-transclude />'
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
