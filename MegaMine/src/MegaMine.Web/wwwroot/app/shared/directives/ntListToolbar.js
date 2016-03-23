'use strict';
angular.module('megamine').directive('ntListToolbar', ntListToolbar)
ntListToolbar.$inject = ['constants'];

function ntListToolbar(constants) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            vm: '=',
            header: '@',
            buttonType: '@',
            buttonText: '@',
            buttonIconCss: '@',
            buttonToolTip: '@',
            buttonClick: '&',
            claim: '@',
            toolbarCss: '@',
            gridClass: '@'
        },
        link: link,
        template: '<nt-toolbar header="{{header}}" class="{{toolbarCss}}">'
                        + '<span ng-transclude>'
                        + '<nt-button type="{{buttonType}}" icon-css="th" tool-tip="Grid View" button-text="Grid" ng-click="toggleView()" ng-hide="viewType === viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="{{buttonType}}" icon-css="tachometer" tool-tip="Dashboard View" button-text="Dashboard" ng-click="toggleView()" ng-hide="viewType !== viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="{{buttonType}}" icon-css="list" tool-tip="Toogle List" button-text="List" ng-click="toggleListView()" ng-hide="viewType === viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="{{buttonType}}" icon-css="{{buttonIconCss}}" tool-tip="{{buttonToolTip}}" button-text="{{buttonText}}" ng-click="buttonClick({$event: $event})" claim="{{claim}}"></nt-button>'
                        + '</span>'
                    + '</nt-toolbar>'
                    + '<nt-grid vm="vm" grid-class="{{gridClass}}" ng-hide="viewType !== viewTypeEnum.grid"></nt-grid>'

    };

    function link(scope, element, attrs, nullController, transclude) {
        scope.toolbarCss = scope.toolbarCss === undefined ? 'command-bar' : scope.toolbarCss;
        scope.gridClass = scope.gridClass === undefined ? 'main-grid' : scope.gridClass;
        scope.buttonIconCss = scope.buttonIconCss === undefined ? 'plus' : scope.buttonIconCss;

        scope.viewType = scope.viewType || constants.enum.viewType.dashboard;
        scope.viewTypeEnum = constants.enum.viewType;

        scope.toggleView = function () {
            scope.viewType = scope.viewType === constants.enum.viewType.dashboard || scope.viewType === constants.enum.viewType.list ? constants.enum.viewType.grid : constants.enum.viewType.list;
        }
        scope.toggleListView = function () {
            scope.viewType = scope.viewType === constants.enum.viewType.list ? constants.enum.viewType.dashboard : constants.enum.viewType.list;
        }
    }
}
