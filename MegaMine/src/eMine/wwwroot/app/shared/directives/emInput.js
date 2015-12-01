'use strict';
angular.module('megamine').directive('emInput', emInput)
emInput.$inject = ['moment', 'constants'];

function emInput(moment, constants) {
    return {
        restrict: 'E',
        scope: {
            ngModel: "=",
            form: "=",
            label: '@',
            controlName: '@',
            type: '@',
            ngRequired: '=',
            ngDisabled: '=',
            ngChange: '=',
            emMaxlength: '@',
            style: '@',
            errorMessages: '=',
        },
        link: link,
        template: '<md-input-container md-is-error="isFieldError()" style="{{style}}">'
                    + '<label>{{label}}</label>'
                    + '<input name="{{controlName}}" type="{{type}}" ng-required="{{ngRequired}}" ng-disabled="ngDisabled" md-maxlength="{{emMaxlength}}" ng-model="ngModel" ng-change="ngChange" >'
                    + '<div ng-messages="form[controlName].$error" ng-show="isFieldError()">'
                    + '<span ng-message="required">Required!</span>'
                    + '<span ng-message="md-maxlength">Text is too long!</span>'
                    + '<span ng-message="number">Invalid number!</span>'
                    + '<span ng-message="date">Invalid date!</span>'
                    + '<span ng-message="datetimelocal">Invalid date!</span>'
                    + '<span ng-repeat="errorMessage in errorMessages">'
                        + '<span ng-message-exp="errorMessage.type">{{ errorMessage.text }}</span>'
                    + '</span>'
                    + '</div>'
                    + '</md-input-container>'

    };

    function link(scope, element, attrs, nullController, transclude) {

        if (scope.type === "date" || scope.type === "time" || scope.type === "datetime-local") {
            if (scope.ngModel !== null && scope.ngModel !== undefined) {
                scope.ngModel = new Date(moment(scope.ngModel).format(constants.momentDateTimeFormat));
            }
        }

        if (scope.type === undefined)
            scope.type = "text";
        if (scope.$parent.dialogMode !== undefined) {
            scope.ngDisabled = scope.$parent.dialogMode !== constants.enum.dialogMode.save
        }
        scope.isFieldError = function () {
            if (scope.form === undefined) {
                scope.form = scope.$parent.dialogForm;
            }
            if (scope.form !== undefined) {
                var control = scope.form[scope.controlName];
                return scope.form.$submitted && !control.$valid;
            }
        }
    }
}
