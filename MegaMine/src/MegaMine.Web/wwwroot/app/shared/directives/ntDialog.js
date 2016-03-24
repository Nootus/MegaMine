'use strict';
angular.module('megamine').directive('ntDialog', ntDialog)
ntDialog.$inject = ['$mdDialog', 'constants'];

function ntDialog($mdDialog, constants) {
    return {
        restrict: 'E',
        transclude: {
            'dialogButtons': '?dialogButtons'
        },
        scope: {
            form: '@',
            header: '@',
            saveText: '@'
        },
        link: link,
        template: ''
                    + '<form name="{{form}}" novalidate>'
                    + '    <nt-toolbar header="{{header}}" class="command-bar dialog">'
                    + '      <md-dialog-actions>'
                    + '       <span ng-transclude="dialogButtons"></span>'
                    + '       <nt-button type="command-bar" icon-css="floppy-o" button-text="{{saveText}}" ng-click="save(dialogForm)" ng-show="dialogMode === dialogModeEnum.save" ng-disabled="dialogForm.$invalid && dialogForm.$submitted"></nt-button>'
                    + '       <nt-button type="command-bar" icon-css="trash" css-class="delete" button-text="Delete" ng-click="deleteItem(dialogForm)" ng-show="dialogMode === dialogModeEnum.delete"></nt-button>'
                    + '       <nt-button type="command-bar" icon-css="ban" button-text="Cancel" ng-click="cancel($event)" ng-show="dialogMode !== dialogModeEnum.view" override-disabled="true"></nt-button>'
                    + '       <nt-button type="command-bar" icon-css="times" button-text="Close" ng-click="cancel($event)" ng-show="dialogMode === dialogModeEnum.view" override-disabled="true"></nt-button>'
                    + '      </md-dialog-actions>'
                    + '    </nt-toolbar>'
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
