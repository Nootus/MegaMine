'use strict';
angular.module('megamine').directive('ntDashobard', ntDashobard)
ntDashobard.$inject = ['$window', '$timeout', '$state', '$stateParams', 'utility', 'constants'];

function ntDashobard($window, $timeout, $state, $stateParams, utility, constants) {
    return {
        restrict: 'E',
        scope: {
            dashboard: '='
        },
        link: link,
        template: '<nt-toolbar header="{{dashboard.header}}" class="command-bar">'
                        + '<nt-button type="command-bar" icon-css="plus-square-o" tool-tip="Add Widget" button-text="Widget" ng-click="addWidget()" ng-hide="viewType === viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="ban" tool-tip="Clear Widgets" button-text="Clear" ng-click="clearWidgets()" ng-hide="viewType === viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="list" tool-tip="Toogle List" button-text="List" ng-click="toggleListView()" ng-hide="viewType === viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="tachometer" tool-tip="Dashboard View" button-text="Dashboard" ng-click="toggleView()" ng-hide="viewType !== viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="th" tool-tip="Grid View" button-text="Grid" ng-click="toggleView()" ng-hide="viewType === viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="refresh" tool-tip="Refresh Page" button-text="Refresh" ng-click="refresh()"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="plus" tool-tip="{{dashboard.options.addOptions.toolTip}}" button-text="{{dashboard.options.addOptions.text}}" ng-click="dashboard.options.addOptions.add($event)" claim="{{dashboard.options.addOptions.claim}}"></nt-button>'
                    + '</nt-toolbar>'
                    + '<div class="portal-content">'
                        + '<nt-grid class="grid-content" vm="vm" grid-options="dashboard.options.gridOptions" grid-class="main-grid" ng-hide="viewType !== viewTypeEnum.grid" ng-style="{\'height\' : height }"></nt-grid>'
                        + '<div class="chart-content full-width" layout="row" ng-hide="viewType === viewTypeEnum.grid" ng-style="{\'height\' : height }" >'
                            + '<div flex>'
                                + '<md-whiteframe class="md-whiteframe-24dp" flex>'
                                    + '<md-content class="chart-bar">'
                                        + '<nt-gridster widgets="dashboard.widgets"></nt-gridster>'
                                    + '</md-content>'
                                + '</md-whiteframe>'
                            + '</div>'
                            + '<div flex="20" layout="row" class="right-bar" ng-show="viewType === viewTypeEnum.list">'
                                + '<md-whiteframe class="md-whiteframe-24dp" flex>'
                                    + '<md-content flex>'
                                        + '<div class="class="full-width">'
                                        + '<md-list>'
                                            + '<md-list-item class="md-3-line right-list" ng-repeat="item in dashboard.options.listOptions.data track by item[dashboard.options.listOptions.primaryField]" ng-mouseenter="showContextMenu = true" ng-mouseleave="showContextMenu = false">'
                                                + '<div class="md-list-item-text right-list-item" layout="column">'
                                                    + '<h3>{{ item[dashboard.options.listOptions.fields[0]] }}</h3>'
                                                    + '<h4>{{ item[dashboard.options.listOptions.fields[1]] }}</h4>'
                                                    + '<p>{{ item[dashboard.options.listOptions.fields[2]] }}</p>'
                                                + '</div>'
                                                + '<div class="right-list-menu" ng-show="showContextMenu">'
                                                    + '<nt-button type="context-bar" icon-css="eye" tool-tip="View" ng-click="dashboard.options.addOptions.view(item, ' + constants.enum.dialogMode.view + ', $event)"></nt-button>'
                                                    + '<nt-button type="context-bar" icon-css="pencil-square-o" tool-tip="Edit" ng-click="dashboard.options.addOptions.view(item, ' + constants.enum.dialogMode.save + ', $event)"></nt-button>'
                                                    + '<nt-button type="context-bar" icon-css="trash" tool-tip="Delete" ng-click="dashboard.options.addOptions.view(item, ' + constants.enum.dialogMode.delete + ', $event)"></nt-button>'
                                                + '</div>'
                                            + '</md-list-item>'
                                        + '</md-list>'
                                    + '</div>'
                                    + '</md-content>'
                                + '</md-whiteframe>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
    };

    function link(scope, element, attrs, nullController) {

        scope.dashboard.options.gridOptions.view = scope.dashboard.options.addOptions.view;

        scope.viewType = scope.viewType || constants.enum.viewType.list;
        scope.viewTypeEnum = constants.enum.viewType;

        //scope function
        scope.toggleListView = function () { toggleListView(scope); };
        scope.toggleView = function () { toggleView(scope); };
        scope.refresh = refresh;
        scope.addWidget = function () { addWidget(scope); };;
        scope.clearWidgets = function () { clearWidgets(scope); }

        setHeight(scope);

        scope.$on('window_resize', function (sizes, gridster) {
            setHeight(scope);
        });
    }

    function toggleView(scope) {
        scope.viewType = scope.viewType === constants.enum.viewType.dashboard || scope.viewType === constants.enum.viewType.list ? constants.enum.viewType.grid : constants.enum.viewType.list;
    }

    function toggleListView(scope) {
        scope.viewType = scope.viewType === constants.enum.viewType.list ? constants.enum.viewType.dashboard : constants.enum.viewType.list;
    }

    function setHeight(scope) {
        $timeout(function () {
            scope.height = utility.getContentHeight('main-content', 'portal-content', 10);
        });
    }

    function addWidget(scope) {
        scope.dashboard.widgets.push({
            name: "New Widget",
            sizeX: 1,
            sizeY: 1
        })
    }

    function clearWidgets(scope) {
        scope.dashboard.widgets.splice(0, scope.dashboard.widgets.length)
    }

    function refresh() {
        var current = $state.current;
        var params = angular.copy($stateParams);
        return $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });
    }
}
