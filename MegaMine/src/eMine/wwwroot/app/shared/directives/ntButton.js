'use strict';
angular.module('megamine').directive('ntButton', ntButton)
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
            hide: '@',
            ntDisabled: '=',
            form: '='
        },
        link: link,
        template: '<md-button class="{{class}}" ng-hide="hide" aria-label="{{buttonText}}" ng-click="ntClick($event)"'
                    + ' ng-disabled="form.$invalid && form.$submitted && ntDisabled">'
                    + ' <md-icon class="icon-button" md-svg-icon="content/images/icons/common/{{buttonIcon}}.svg"></md-icon>{{buttonText}}'
                    + '</md-button>'

    };

    function link(scope, element, attrs, nullController) {
        if (scope.module === undefined || scope.claim === undefined || scope.module === '' || scope.claim === '') {
            scope.hide = false;
        }
        else {
            scope.hide = !profile.isAuthorized(scope.module, scope.claim);
        }

        //setting the default values
        scope.class = scope.class === undefined ? 'md-raised md-primary md-default-theme' : scope.class;
        scope.ntDisabled = scope.ntDisabled === undefined ? true : scope.ntDisabled;

        scope.ntClick = function (ev) {
            if (scope.form === undefined) {
                scope.form = scope.$parent.dialogForm;
            }

            if (scope.form != undefined) {
                scope.form.$setSubmitted();
            }
        }
    }
}
