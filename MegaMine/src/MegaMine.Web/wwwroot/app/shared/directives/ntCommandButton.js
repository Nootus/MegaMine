'use strict';
angular.module('megamine').directive('ntCommandButton', ntCommandButton)
ntCommandButton.$inject = ['profile'];

function ntCommandButton(profile) {
    return {
        restrict: 'E',
        scope: {
            cssClass: '@',
            title: '@',
            buttonIcon: '@',
            buttonText: '@',
            claim: '@',
            hide: '@',
            overrideDisabled: '@',
            form: '=?'
        },
        link: link,
        template: '<md-button title="{{title}}" class="{{cssClass}}" ng-hide="hide" aria-label="{{title}}" ng-click="ntClick($event)"'
                    + ' ng-disabled="form.$invalid && form.$submitted && bypassDisabled">'
                    + ' <md-icon class="icon-button" md-svg-icon="content/images/icons/common/{{buttonIcon}}.svg"></md-icon>{{buttonText}}'
                    + '</md-button>'

    };

    function link(scope, element, attrs, nullController) {
        if (scope.claim === undefined || scope.claim === '') {
            scope.hide = false;
        }
        else {
            scope.hide = !profile.isAuthorized(scope.claim.split(","));
        }

        //setting the default values
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
