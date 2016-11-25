'use strict';
angular.module('megamine').directive('ntDialog', ntDialog)
ntDialog.$inject = ['$mdDialog', "MegaMine.Shared.Constants"];

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
        link: {
            pre: preLink,
            post: postLink
        },
        template: ''
                    + '<form name="{{form}}" novalidate>'
                    + '    <nt-toolbar header="{{header}}" class="command-bar dialog">'
                    + '      <md-dialog-actions>'
                    + '       <span ng-transclude="dialogButtons"></span>'
                    + '       <nt-button type="command-bar" icon-css="floppy-o" text="{{saveText}}" ng-click="save(dialogForm)" ng-show="dialogMode === dialogModeEnum.save" ng-disabled="dialogForm.$invalid && dialogForm.$submitted"></nt-button>'
                    + '       <nt-button type="command-bar" icon-css="trash" css-class="delete" text="Delete" ng-click="deleteItem(dialogForm)" ng-show="dialogMode === dialogModeEnum.delete"></nt-button>'
                    + '       <nt-button type="command-bar" icon-css="ban" text="Cancel" ng-click="cancel($event)" ng-show="dialogMode !== dialogModeEnum.view" override-disabled="true"></nt-button>'
                    + '       <nt-button type="command-bar" icon-css="times" text="Close" ng-click="cancel($event)" ng-show="dialogMode === dialogModeEnum.view" override-disabled="true"></nt-button>'
                    + '      </md-dialog-actions>'
                    + '    </nt-toolbar>'
                    + '    <md-dialog-content class="dialog-content">'
                    + '       <div ng-transclude></div>'
                    + '    </md-dialog-content>'
                    + '</form>'
                    + ''
    };

    function preLink(scope, element, attrs, nullController, transclude) {
        // interal variables
        if (scope.saveText === undefined)
            scope.saveText = 'Save';

        angular.extend(scope, {
            dialogModeEnum: constants.enum.dialogMode,
            dialogMode: scope.$parent.vm.dialogMode,
            save: scope.$parent.vm.save,
            deleteItem: scope.$parent.vm.deleteItem,
            cancel: scope.$parent.vm.cancel,
        });
    }

    function postLink(scope, element, attrs, nullController, transclude) {
        scope.dialogForm = scope[scope.form]
        scope.$parent.vm.dialogForm = scope.dialogForm;
    }
}
