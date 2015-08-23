'use strict';
angular.module('emine').directive('ntDialog', ntDialog)
ntDialog.$inject = ['$mdDialog', 'constants'];

function ntDialog($mdDialog, constants) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            form: '@',
            title: '@'
        },
        link: link,
        template: ''
                    + '<form name="{{form}}" novalidate>'
                    + '    <em-toolbar title="{{title}}" class="dialog">'
                    + '       <md-button ng-click="save(dialogForm)" class="md-raised md-primary" ng-show="dialogMode == dialogModeEnum.save" ng-disabled="dialogForm.$invalid && dialogForm.$submitted" aria-label="Save">'
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

    function link(scope, element, attrs, nullController, transclude) {
        //interal variables
        angular.extend(scope, {
            dialogModeEnum: constants.enum.dialogMode,
            dialogMode: scope.$parent.dialogMode,
            save: scope.$parent.save,
            cancel: scope.$parent.cancel,
        });

        scope.dialogForm = scope[scope.form]
    }
}
