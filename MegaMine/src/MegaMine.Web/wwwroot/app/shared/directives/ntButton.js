'use strict';
angular.module('megamine').directive('ntButton', ntButton)
ntButton.$inject = ['profile'];

function ntButton(profile) {
    return {
        restrict: 'E',
        scope: {
            cssClass: '@',
            type: '@',
            toolTip: '@',
            iconCss: '@',
            icon: '@',
            text: '@',
            claim: '@',
            hide: '@',
            overrideDisabled: '@',
            form: '=?'
        },
        link: link,
        template: '<md-button class="{{cssClass}} {{type}}-button has-hover" ng-hide="hide" aria-label="{{toolTip}}" ng-click="ntClick($event)"'
                    + ' ng-disabled="form.$invalid && form.$submitted && bypassDisabled">'
                    + ' <md-tooltip ng-style="toolTipStyle">{{toolTip}}</md-tooltip>'
                    + ' <md-icon class="fa fa-{{iconCss}} {{type}}-button-icon" aria-label="{{toolTip}}"></md-icon>'
                    + ' <div class="{{type}}-button-text">{{text}}</div>'
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
        //hiding the tooltip if not specified
        scope.hideToolTip = scope.toolTip === undefined ? true : false;
        if (scope.hideToolTip) {
            scope.toolTipStyle = {
                display: 'none'
            };
        }

        //icons
        if (scope.icon !== undefined) {
            switch (scope.icon) {
                case 'save':
                    scope.iconCss = 'save'
                    break;
                case 'update':
                    scope.iconCss = 'check'
                    break;
                case 'add':
                    scope.iconCss = 'plus'
                    break;
                case 'cancel':
                    scope.iconCss = 'ban'
                    break;
            }
        }
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
