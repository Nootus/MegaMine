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
            overrideDisabled: '@',
            form: '=?'
        },
        link: link,
        template: '<span ng-hide="hideButton === true" ><md-button class="{{cssClass}} {{type}}-button has-hover" aria-label="{{toolTip}}" ng-click="ntClick({ev: $event})"'
                    + ' ng-disabled="form.$invalid && form.$submitted && bypassDisabled">'
                    + ' <md-tooltip ng-style="toolTipStyle">{{toolTip}}</md-tooltip>'
                    + ' <md-icon class="fa fa-{{iconCss}} {{type}}-button-icon" aria-label="{{toolTip}}"></md-icon>'
                    + ' <div class="{{type}}-button-text">{{text}}</div>'
                    + '</md-button></span>'

    };

    function link(scope, element, attrs, nullController) {
        if (scope.claim === undefined || scope.claim === '') {
            scope.hideButton = false;
        }
        else {
            scope.hideButton = !profile.isAuthorized(scope.claim.split(","));
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
                case 'check':
                    scope.iconCss = 'check'
                    break;
                case 'update':
                    scope.iconCss = 'check'
                    break;
                case 'edit':
                    scope.iconCss = 'pencil'
                    break;
                case 'add':
                    scope.iconCss = 'plus'
                    break;
                case 'cancel':
                    scope.iconCss = 'ban'
                    break;
                case 'move':
                    scope.iconCss = 'truck'
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
