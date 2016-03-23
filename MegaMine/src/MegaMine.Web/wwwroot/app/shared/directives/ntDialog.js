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
            title: '@',
            saveText: '@'
        },
        link: link,
        template: ''
                    + '<form name="{{form}}" novalidate>'
+ '<nt-toolbar header="Quarries" class="command-bar">'
+ '    <nt-button type="command-bar" icon-css="plus" tool-tip="New Quarry" button-text="New" ng-click="vm.addQuarry($event)"></nt-button>'
+ '    <nt-button type="command-bar" icon-css="th" tool-tip="Grid View" button-text="Grid" ng-click="vm.addQuarry($event)"></nt-button>'
+ '    <nt-button type="command-bar" icon-css="tachometer" tool-tip="Dashboard View" button-text="Dashboard" ng-click="vm.addQuarry($event)"></nt-button>'
+ '    <nt-button type="command-bar" icon-css="list" tool-tip="Toogle List" button-text="List" ng-click="vm.addQuarry($event)"></nt-button>'
+ '</nt-toolbar>'


                    + '    <nt-toolbar title="{{title}}" class="dialog">'
                    + '      <md-dialog-actions>'
                    + '       <span ng-transclude="dialogButtons"></span>'
                    + '       <nt-old-button ng-click="save(dialogForm)" button-icon="save" button-text="{{saveText}}" ng-show="dialogMode === dialogModeEnum.save" ng-disabled="dialogForm.$invalid && dialogForm.$submitted""></nt-button>'
                    + '       <nt-old-button ng-click="deleteItem(dialogForm)" button-icon="delete" button-text="Delete" css-class="delete" ng-show="dialogMode === dialogModeEnum.delete"></nt-button>'
                    + '       <nt-old-button ng-click="cancel($event)" button-icon="cancel" button-text="Cancel" ng-show="dialogMode !== dialogModeEnum.view" override-disabled="true"></nt-button>'
                    + '       <nt-old-button ng-click="cancel($event)" button-icon="cancel" button-text="Close" ng-show="dialogMode === dialogModeEnum.view" override-disabled="true"></nt-button>'
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
