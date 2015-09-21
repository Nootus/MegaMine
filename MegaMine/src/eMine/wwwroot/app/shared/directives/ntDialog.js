﻿'use strict';
angular.module('emine').directive('ntDialog', ntDialog)
ntDialog.$inject = ['$mdDialog', 'constants'];

function ntDialog($mdDialog, constants) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            form: '@',
            title: '@',
            saveText: '@'
        },
        link: link,
        template: ''
                    + '<form name="{{form}}" novalidate>'
                    + '    <em-toolbar title="{{title}}" class="dialog">'
                    + '       <nt-button ng-click="save(dialogForm)" button-icon="save" button-text="{{saveText}}" ng-show="dialogMode === dialogModeEnum.save" ng-disabled="dialogForm.$invalid && dialogForm.$submitted""></nt-button>'
                    + '       <nt-button ng-click="deleteItem($event)" button-icon="delete" button-text="Delete" ng-show="dialogMode === dialogModeEnum.delete"></nt-button>'
                    + '       <nt-button ng-click="cancel($event)" button-icon="cancel" button-text="Cancel" ng-show="dialogMode !== dialogModeEnum.view"></nt-button>'
                    + '       <nt-button ng-click="cancel($event)" button-icon="cancel" button-text="Close" ng-show="dialogMode === dialogModeEnum.view"></nt-button>'
                    + '    </em-toolbar>'
                    + '    <md-dialog-content class="dialog-content">'
                    + '       <div ng-transclude></div>'
                    + '    </md-dialog-content>'
                    + '</form>'
                    + ''
    };

    function link(scope, element, attrs, nullController, transclude) {
        //interal variables
        angular.extend(scope, {
            dialogModeEnum: constants.enum.dialogMode,
            dialogMode: scope.$parent.dialogMode,
            save: scope.$parent.save,
            deleteItem: scope.$parent.deleteItem,
            cancel: scope.$parent.cancel,
        });

        if (scope.saveText === undefined)
            scope.saveText = 'Save';

        scope.dialogForm = scope[scope.form]
        scope.$parent.dialogForm = scope.dialogForm;
    }
}
