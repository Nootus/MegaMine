'use strict';
angular.module('megamine').directive('emSelect', emSelect)
emSelect.$inject = ['$compile', 'constants'];

function emSelect($compile, constants) {
    return {
        restrict: 'E',
        scope: {
            ngModel: "=",
            ngChange: "=",
            optList: "=",
            optValue: "@",
            optText: "@",
            form: "=",
            label: '@',
            controlName: "@",
            ngRequired: '=',
            ngDisabled: '=',
            style: '@',
            errorMessages: '='
    },
        link: link,
    };

    function getTemplate(controlName, optValue, optText) {
        return '<md-input-container class="emselect {{errorCss}}" md-is-error="isFieldError()" style="{{style}}">'
                    + '<label>{{label}}</label>'
                    + '<md-select name="' + controlName + '" ng-required="{{ngRequired}}" ng-disabled="ngDisabled" ng-model="ngModel" ng-change="ngChange" aria-label="{{controlName}}">'
                    + '<md-option ng-value="opt.' + optValue + '" ng-repeat="opt in optList">{{ opt.' + optText + ' }}</md-option>'
                    + '</md-select>'
                    + '<div ng-messages="form[controlName].$error" ng-show="isFieldError()">'
                    + '<span ng-message="required">Required!</span>'
                    + '<span ng-repeat="errorMessage in errorMessages">'
                        + '<span ng-message-exp="errorMessage.type">{{ errorMessage.text }}</span>'
                    + '</span>'
                    + '</div>'
                    + '</md-input-container>'
    }

    function link(scope, element, attrs, nullController, transclude) {

        scope.optValue = scope.optValue === undefined ? "key" : scope.optValue
        scope.optText = scope.optText === undefined ? "item" : scope.optText
        scope.errorCss = "";

        //checking the required
        if (scope.ngModel === 0 && scope.ngRequired === true)
            scope.ngModel = undefined;

        if (scope.$parent.dialogMode !== undefined) {
            scope.ngDisabled = scope.$parent.dialogMode !== constants.enum.dialogMode.save
        }

        var elementHtml = getTemplate(scope.controlName, scope.optValue, scope.optText);
        element.html(elementHtml);
        $compile(element.contents())(scope);

        scope.isFieldError = function () {
            if (scope.form === undefined) {
                scope.form = scope.$parent.dialogForm;
            }

            if (scope.form !== undefined) {
                var control = scope.form[scope.controlName];
                var isError = scope.form.$submitted && !control.$valid;
                if (isError)
                    scope.errorCss = "emselect-invalid";
                else
                    scope.errorCss = "";

                return isError;
            }
        }
    }
}
