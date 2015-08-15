'use strict';
angular.module('emine').directive('ntDialog', ntDialog)
ntDialog.$inject = ['$mdDialog', 'constants'];

function ntDialog($mdDialog, constants) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@',
            dialogMode: '@',
            model: '='
        },
        link: link,
        template: ''
                    + '<form name="stockyardForm" novalidate>'
                    + '    <em-toolbar title="{{title}}" class="dialog">'
                    + '       <md-button ng-click="save(stockyardForm)" class="md-raised md-primary" ng-show="dialogMode == dialogModeEnum.save" ng-disabled="stockyardForm.$invalid && stockyardForm.$submitted" aria-label="Save">'
                    + '            <md-icon class="icon-button" md-svg-icon="content/images/icons/save.svg"></md-icon>Save'
                    + '        </md-button>'
                    + '        <md-button ng-click="cancel()" class="md-raised md-primary" ng-show="dialogMode == dialogModeEnum.save">'
                    + '            <md-icon class="icon-button" md-svg-icon="content/images/icons/cancel.svg"></md-icon>Cancel'
                    + '        </md-button>'
                    + '        <md-button ng-click="cancel()" class="md-raised md-primary" ng-show="dialogMode == dialogModeEnum.view">'
                    + '            <md-icon class="icon-button" md-svg-icon="content/images/icons/cancel.svg"></md-icon>Close'
                    + '        </md-button>'
                    + '        <md-button ng-click="deleteItem()" class="md-raised md-primary" ng-show="dialogMode == dialogModeEnum.delete">'
                    + '            <md-icon class="icon-button" md-svg-icon="content/images/icons/delete.svg"></md-icon>Delete'
                    + '        </md-button>'
                    + '    </em-toolbar>'
                    + '    <md-dialog-content class="dialog-content">'
                    + '       <div ng-transclude></div>'
                    + '    </md-dialog-content>'
                    + '</form>'
                    + ''
    };

    function getTemplate() {
        return '<md-input-container class="emselect {{errorCss}}" md-is-error="isFieldError()" style="{{style}}">'
                    + '<label ng-hide="{{hideLabel}}">{{label}}</label>'
                    + '<md-select name="' + controlName + '" ng-required="{{ngRequired}}" ng-disabled="{{ngDisabled}}" ng-model="ngModel" ng-change="ngChange" aria-label="{{controlName}}">'
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
        //interal variables
        angular.extend(scope, {
                dialogModeEnum: constants.enum.dialogMode,
                save: save,
                cancel: cancel,
                deleteItem: deleteItem
        });

        //var elementHtml = getTemplate(scope.controlName, scope.optValue, scope.optText);
        //element.html(elementHtml);
        //$compile(element.contents())(scope);
    }

    function cancel() {
        event.preventDefault();
        $mdDialog.cancel();
    }

    function deleteItem() {
        event.preventDefault();
        $mdDialog.cancel();
    }

    function save(form) {
        if (form.$valid) {
            alert('form valid');
            $mdDialog.hide();
        }
    }
}
