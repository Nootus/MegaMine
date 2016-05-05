'use strict';
angular.module('megamine').directive('ntDashobard', ntDashobard)
ntDashobard.$inject = ['$timeout', '$state', '$stateParams', 'chart', 'dialogService', 'utility', 'template', 'constants'];

function ntDashobard($timeout, $state, $stateParams, chart, dialogService, utility, template, constants) {
    return {
        restrict: 'E',
        scope: {
            dashboard: '='
        },
        link: link,
        template: '<nt-toolbar header="{{dashboard.header}}" class="command-bar">'
                        + '<nt-button type="command-bar" icon-css="plus-square-o" tool-tip="Add Widget" text="Widget" ng-click="addWidget($event)" ng-hide="viewType === viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="ban" tool-tip="Clear Widgets" text="Clear" ng-click="clearWidgets()" ng-hide="viewType === viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="list" tool-tip="Toogle List" text="List" ng-click="toggleListView()" ng-hide="viewType === viewTypeEnum.grid || viewType === viewTypeEnum.dashboardOnly"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="tachometer" tool-tip="Dashboard View" text="Dashboard" ng-click="toggleView()" ng-hide="viewType !== viewTypeEnum.grid"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="th" tool-tip="Grid View" text="Grid" ng-click="toggleView()" ng-hide="viewType === viewTypeEnum.grid || viewType === viewTypeEnum.dashboardOnly"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="refresh" tool-tip="Refresh Page" text="Refresh" ng-click="refresh()"></nt-button>'
                        + '<nt-button type="command-bar" icon-css="plus" tool-tip="{{dashboard.add.toolTip}}" text="{{dashboard.add.text}}" ng-click="dashboard.add.save($event)" claim="{{dashboard.add.claim}}" ng-hide="viewType === viewTypeEnum.dashboardOnly"></nt-button>'
                    + '</nt-toolbar>'
                    + '<div class="portal-content">'
                        + '<nt-grid class="grid-content" grid="dashboard.grid" ng-hide="viewType !== viewTypeEnum.grid"></nt-grid>'
                        + '<div class="chart-content full-width" layout="row" ng-hide="viewType === viewTypeEnum.grid" ng-style="{\'height\' : height }" >'
                            + '<div flex>'
                                + '<md-whiteframe class="md-whiteframe-24dp" flex>'
                                    + '<md-content class="chart-bar">'
                                        + '<nt-gridster widgets="dashboard.widget.pageWidgets"></nt-gridster>'
                                    + '</md-content>'
                                + '</md-whiteframe>'
                            + '</div>'
                            + '<div flex="20" layout="row" class="right-bar" ng-show="viewType === viewTypeEnum.list">'
                                + '<md-whiteframe class="md-whiteframe-24dp" flex>'
                                    + '<md-content flex>'
                                        + '<div class="class="full-width">'
                                        + '<md-list>'
                                            + '<md-list-item class="md-3-line right-list" ng-repeat="item in dashboard.list.data track by item[dashboard.list.options.primaryField]" ng-mouseenter="showContextMenu = true" ng-mouseleave="showContextMenu = false">'
                                                + '<div class="md-list-item-text right-list-item" layout="column">'
                                                    + '<h3>{{ item[dashboard.list.options.fields[0]] }}</h3>'
                                                    + '<h4>{{ item[dashboard.list.options.fields[1]] }}</h4>'
                                                    + '<p>{{ item[dashboard.list.options.fields[2]] }}</p>'
                                                + '</div>'
                                                + '<div class="right-list-menu" ng-show="showContextMenu">'
                                                    + '<nt-button type="context-bar" icon-css="eye" tool-tip="View" ng-click="dashboard.list.view(item, ' + constants.enum.dialogMode.view + ', $event)"></nt-button>'
                                                    + '<nt-button type="context-bar" icon-css="pencil-square-o" tool-tip="Edit" claim="{{dashboard.list.options.editClaim}}" ng-click="dashboard.list.view(item, ' + constants.enum.dialogMode.save + ', $event)"></nt-button>'
                                                    + '<nt-button type="context-bar" icon-css="trash" tool-tip="Delete" claim="{{dashboard.list.options.deleteClaim}}" ng-click="dashboard.list.view(item, ' + constants.enum.dialogMode.delete + ', $event)"></nt-button>'
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

        //setting grid button row
        scope.dashboard.grid.options.columnDefs.push(template.getButtonDefaultColumnDefs(scope.dashboard.list.options.primaryField, scope.dashboard.list.options.editClaim, scope.dashboard.list.options.deleteClaim, scope.dashboard.list.options.hideButtons));

        //setting the chart options based on the chart type
        chart.set(scope.dashboard.widget.widgets);

        //adding additional items to the dashboard object
        scope.dashboard.widgetSettings = widgetSettings;

        preprocessWidgets(scope.dashboard);

        if (scope.dashboard.dashboardOnly === true) {
            scope.viewType = constants.enum.viewType.dashboardOnly;
        }
        else {
            scope.viewType = scope.viewType || constants.enum.viewType.list;
        }

        scope.viewTypeEnum = constants.enum.viewType;

        //scope function
        scope.toggleListView = function () { toggleListView(scope); };
        scope.toggleView = function () { toggleView(scope); };
        scope.refresh = refresh;
        scope.addWidget = function (ev) { widgetSettings(ev, undefined, scope.dashboard); };;
        scope.clearWidgets = function () { clearWidgets(scope); }

        setHeight(scope);

        scope.$on('window_resize', function () {
            setHeight(scope);
        });
    }

    function preprocessWidgets(dashboard) {
        angular.forEach(dashboard.widget.pageWidgets, function (item) {
            preprocessWidgetItem(item, dashboard);
        })
    }

    function preprocessWidgetItem(widgetItem, dashboard) {
        for (var index = 0; index < dashboard.widget.widgets.length; index++) {
            if (widgetItem.widgetId === dashboard.widget.widgets[index].widgetId) {
                widgetItem.widget = dashboard.widget.widgets[index];
                widgetItem.widget.dashboard = dashboard;
                widgetItem.widgetOptions.chart = widgetItem.widget.chart;
                widgetItem.widget.chart.api = {};
                break;
            }
        }
    }

    function toggleView(scope) {
        scope.viewType = scope.viewType === constants.enum.viewType.dashboard || scope.viewType === constants.enum.viewType.list ? constants.enum.viewType.grid : constants.enum.viewType.list;
    }

    function toggleListView(scope) {
        scope.viewType = scope.viewType === constants.enum.viewType.list ? constants.enum.viewType.dashboard : constants.enum.viewType.list;
    }

    function setHeight(scope) {
        $timeout(function () {
            scope.height = utility.getContentHeight('main-content', 'portal-content', 5);
            scope.dashboard.grid.height = scope.height;
        });
    }

    function widgetSettings(ev, widget, dashboard, id) {
        var header = 'Add Widget';
        var buttonText = 'Add';
        var dialogMode = constants.enum.dialogMode.save;
        
        if (widget !== undefined) {
            header = widget.name;
            buttonText = 'Save'
            dialogMode = constants.enum.dialogMode.save;
        }
        dialogService.show({
            template: getWidgetTemplate(header, buttonText),
            targetEvent: ev,
            data: { model: id, widgets: dashboard.widget.widgets },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            var index = 0;
            for (var index = 0; index < dashboard.widget.widgets.length; index++) {
                if (dialogModel == dashboard.widget.widgets[index].widgetId)
                    break;
            }

            var widgetItem = {
                dashboardPageWidgetId: Math.random(),
                widgetId: dashboard.widget.widgets[index].widgetId,
                widgetOptions: {
                    col: undefined,
                    row: undefined,
                    sizeX: dashboard.widget.widgets[index].sizeX,
                    sizeY: dashboard.widget.widgets[index].sizeY,
                },
            };

            if (widget !== undefined) {
                for (var current = 0; current < dashboard.widget.pageWidgets.length; current++) {
                    if (id == dashboard.widget.pageWidgets[current].dashboardPageWidgetId)
                        break;
                }
                angular.extend(widgetItem.widgetOptions, dashboard.widget.pageWidgets[current].widgetOptions);
                dashboard.widget.pageWidgets.splice(current, 1);
            }

            preprocessWidgetItem(widgetItem, dashboard);
            dashboard.widget.pageWidgets.push(widgetItem);

            dialogService.hide();
        });

    }

    function getWidgetTemplate(title, buttonText) {
        return '<md-dialog aria-label="' + title + '" class="dialog">'
                    + '<nt-dialog form="widgetForm" header="' + title + '" save-text="' + buttonText + '">'
                        + '<div layout="row">'
                                + '<nt-select flex="50" form="widgetForm" label="Select Widget" control-name="widget" ng-model="vm.model" opt-list="widgets" opt-value="widgetId" opt-text="name" ng-required="true"></nt-select>'
                        + '</div>'
                    + '</nt-dialog>'
                + '</md-dialog>'
    }

    function clearWidgets(scope) {
        scope.dashboard.widget.pageWidgets.splice(0, scope.dashboard.widget.pageWidgets.length)
    }

    function refresh() {
        var current = $state.current;
        var params = angular.copy($stateParams);
        return $state.transitionTo(current, params, { reload: true, inherit: true, notify: true });
    }
}
