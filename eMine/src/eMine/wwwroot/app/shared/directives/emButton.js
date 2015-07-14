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
        scope.hide = !profile.isAuthorized(scope.module, scope.claim);
    }
}
