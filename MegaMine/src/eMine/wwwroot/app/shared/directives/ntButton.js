'use strict';
angular.module('megamine').directive('ntButton', ntButton)
ntButton.$inject = ['profile'];

function ntButton(profile) {
    return {
        restrict: 'E',
        scope: {
            class: '@',
            title: '@',
            buttonIcon: '@',
            buttonText: '@',
            module: '@',
            claim: '@',
            hide: '@',
            overrideDisabled: '@',
            form: '=?'
        },
        link: link,
        template: '<md-button title="{{title}}" class="{{class}}" ng-hide="hide" aria-label="{{title}}" ng-click="ntClick($event)"'
                    + ' ng-disabled="form.$invalid && form.$submitted && bypassDisabled">'
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
        scope.bypassDisabled = scope.overrideDisabled === "true" ? false : true;
        scope.title = scope.title === undefined ? scope.buttonText : scope.title;

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
