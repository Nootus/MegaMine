'use strict';
angular.module('megamine').directive('ntListToolbar', ntListToolbar)
ntListToolbar.$inject = ['$window', '$timeout', 'utility', 'constants'];

function ntListToolbar($window, $timeout, utility, constants) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            vm: '=',
            listItems: '=',
            listFields: '=',
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
                        + '<span>'
                        + '<nt-button type="{{buttonType}}" icon-css="th" tool-tip="Grid View" button-text="Grid" ng-click="toggleView()" ng-hide="viewType === viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="{{buttonType}}" icon-css="tachometer" tool-tip="Dashboard View" button-text="Dashboard" ng-click="toggleView()" ng-hide="viewType !== viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="{{buttonType}}" icon-css="list" tool-tip="Toogle List" button-text="List" ng-click="toggleListView()" ng-hide="viewType === viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="{{buttonType}}" icon-css="refresh" tool-tip="Refresh Page" button-text="Refresh" ng-click="refresh()"></nt-button>'
                        + '<nt-button type="{{buttonType}}" icon-css="{{buttonIconCss}}" tool-tip="{{buttonToolTip}}" button-text="{{buttonText}}" ng-click="buttonClick({$event: $event})" claim="{{claim}}"></nt-button>'
                        + '</span>'
                    + '</nt-toolbar>'
                    + '<nt-grid class="grid-content" vm="vm" grid-class="{{gridClass}}" ng-hide="viewType !== viewTypeEnum.grid" ng-style="{\'height\' : height }"></nt-grid>'
                    + '<div class="chart-content full-width" layout="row" ng-hide="viewType === viewTypeEnum.grid" ng-style="{\'height\' : height }" >'
                        + '<div flex>'
                            + '<md-whiteframe class="md-whiteframe-24dp" flex>'
                                + '<md-content flex>'
                                    + '<div ng-transclude></div>'
                                + '</md-content>'
                            + '</md-whiteframe>'
                        + '</div>'
                        + '<div flex="20" layout="row" class="right-bar" ng-show="viewType === viewTypeEnum.list">'
                            + '<md-whiteframe class="md-whiteframe-24dp" flex>'
                                + '<md-content flex>'
                                    + '<div class="class="full-width">'
                                    + '<md-list>'
                                        + '<md-list-item class="md-3-line right-list" ng-repeat="item in listItems" ng-mouseenter="showContextMenu = true" ng-mouseleave="showContextMenu = false">'
                                            + '<div class="md-list-item-text right-list-item" layout="column">'
                                                + '<h3>{{ item[listFields[0]] }}</h3>'
                                                + '<h4>{{ item[listFields[1]] }}</h4>'
                                                + '<p>{{ item[listFields[2]] }}</p>'
                                            + '</div>'
                                            + '<div class="right-list-menu" ng-show="showContextMenu">'
                                                + '<nt-button type="context-bar" icon-css="eye" tool-tip="View" ng-click="vm.viewDialog(item, ' + constants.enum.dialogMode.view + ', $event)"></nt-button>'
                                                + '<nt-button type="context-bar" icon-css="pencil-square-o" tool-tip="Edit" ng-click="vm.viewDialog(item, ' + constants.enum.dialogMode.save + ', $event)"></nt-button>'
                                                + '<nt-button type="context-bar" icon-css="trash" tool-tip="Delete" ng-click="vm.viewDialog(item, ' + constants.enum.dialogMode.delete + ', $event)"></nt-button>'
                                            + '</div>'
                                        + '</md-list-item>'
                                    + '</md-list>'
                                + '</div>'
                                + '</md-content>'
                            + '</md-whiteframe>'
                        + '</div>'
                    + '</div>'

    };

    function link(scope, element, attrs, nullController, transclude) {
        scope.toolbarCss = scope.toolbarCss === undefined ? 'command-bar' : scope.toolbarCss;
        scope.gridClass = scope.gridClass === undefined ? 'main-grid' : scope.gridClass;
        scope.buttonIconCss = scope.buttonIconCss === undefined ? 'plus' : scope.buttonIconCss;

        scope.viewType = scope.viewType || constants.enum.viewType.list;
        scope.viewTypeEnum = constants.enum.viewType;

        scope.toggleView = function () {
            scope.viewType = scope.viewType === constants.enum.viewType.dashboard || scope.viewType === constants.enum.viewType.list ? constants.enum.viewType.grid : constants.enum.viewType.list;
            refreshCharts(scope);
        }
        scope.toggleListView = function () {
            scope.viewType = scope.viewType === constants.enum.viewType.list ? constants.enum.viewType.dashboard : constants.enum.viewType.list;
            refreshCharts(scope);
        }

        scope.refresh = function () {
            refresh(scope);
        };

        setHeight(scope);

        angular.element($window).bind('resize', function () {
            setHeight(scope);
            refreshCharts(scope);
        });
        scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });

    }

    function setHeight(scope) {
        $timeout(function () {
            var contentClass = 'chart-content';
            if (scope.viewType === constants.enum.viewType.grid) {
                contentClass = 'grid-content';
            }
            scope.height = utility.getContentHeight('main-content', contentClass, 10);
        });
    }

    function refreshCharts(scope) {
        //if (scope.viewType === constants.enum.viewType.dashboard || scope.viewType === constants.enum.viewType.list) {
        //    $timeout(function () {
        //        if (scope.vm.refreshCharts)
        //            scope.vm.refreshCharts();
        //    })
        //}
    }

    function refresh(scope) {
        //if (scope.vm.refresh) {
        //    scope.vm.refresh().
        //        then(function () {
        //            refreshCharts(scope);
        //        })
        //}
    }
}
