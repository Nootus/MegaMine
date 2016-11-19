var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Widget;
    (function (Widget) {
        let NtDashobard_1;
        let NtDashobard = NtDashobard_1 = class NtDashobard {
            constructor($timeout, $state, $stateParams, chartOptions, dialogService, utility, constants) {
                this.$timeout = $timeout;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.chartOptions = chartOptions;
                this.dialogService = dialogService;
                this.utility = utility;
                this.constants = constants;
                // directive attributes
                this.restrict = "E";
                this.scope = {
                    dashboard: "=",
                    headerClass: "@"
                };
                this.link = this.linkFn;
                this.template = this.getTemplate();
                this.controller = NtDashobard_1;
                this.controllerAs = "$ctrl";
                this.widgetSettings = (ev, widget, dashboard, id) => {
                    let self = this;
                    let header = "Add Widget";
                    let buttonText = "Add";
                    let dialogMode = 1 /* save */;
                    if (widget !== undefined) {
                        header = widget.name;
                        buttonText = "Save";
                        dialogMode = 1 /* save */;
                    }
                    self.dialogService.show({
                        template: self.getWidgetTemplate(header, buttonText),
                        targetEvent: ev,
                        data: { model: id, dataOptions: { widgets: dashboard.widgets.allWidgets } },
                        dialogMode: dialogMode
                    })
                        .then(function (dialogModel) {
                        let index = 0;
                        for (index = 0; index < dashboard.widgets.allWidgets.length; index++) {
                            if (dialogModel === dashboard.widgets.allWidgets[index].widgetId) {
                                break;
                            }
                        }
                        let widgetItem = {
                            dashboardPageWidgetId: Math.random(),
                            widgetId: dashboard.widgets.allWidgets[index].widgetId,
                            widgetOptions: {
                                columns: undefined,
                                rows: undefined,
                                sizeX: dashboard.widgets.allWidgets[index].sizeX,
                                sizeY: dashboard.widgets.allWidgets[index].sizeY
                            }
                        };
                        if (widget !== undefined) {
                            let current;
                            for (current = 0; current < dashboard.widgets.pageWidgets.length; current++) {
                                if (id === dashboard.widgets.pageWidgets[current].dashboardPageWidgetId) {
                                    break;
                                }
                            }
                            angular.extend(widgetItem.widgetOptions, dashboard.widgets.pageWidgets[current].widgetOptions);
                            dashboard.widgets.pageWidgets.splice(current, 1);
                        }
                        self.preprocessWidgetItem(widgetItem, dashboard);
                        dashboard.widgets.pageWidgets.push(widgetItem);
                        self.dialogService.hide();
                    });
                };
            }
            getTemplate() {
                return `<nt-toolbar header="{{dashboard.header}}" class="command-bar {{headerClass}}">
                        <nt-button type="command-bar" icon-css="plus-square-o" tool-tip="Add Widget" text="Widget" 
                            ng-click="addWidget($event)" ng-hide="viewType === ${1 /* grid */}">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="ban" tool-tip="Clear Widgets" text="Clear" ng-click="clearWidgets()" 
                            ng-hide="viewType === ${1 /* grid */}">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="list" tool-tip="Toogle List" text="List" ng-click="toggleListView()" 
                            ng-hide="viewType === ${1 /* grid */} || 
                                                                    viewType === ${3 /* dashboardOnly */}">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="tachometer" tool-tip="Dashboard View" text="Dashboard" 
                            ng-click="toggleView()" ng-hide="viewType !== ${1 /* grid */}">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="th" tool-tip="Grid View" text="Grid" ng-click="toggleView()" 
                            ng-hide="viewType === ${1 /* grid */} || 
                                                                    viewType === ${3 /* dashboardOnly */}">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="refresh" tool-tip="Refresh Page" text="Refresh" ng-click="$ctrl.refresh()">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="plus" tool-tip="{{dashboard.records.buttons.add.toolTip}}" 
                            text="{{dashboard.records.buttons.add.text}}" 
                            ng-click="dashboard.records.buttons.add.save($event, dashboard.context)" 
                            claim="{{dashboard.records.buttons.add.claim}}" 
                            ng-hide="viewType === ${3 /* dashboardOnly */}">
                        </nt-button>
                    </nt-toolbar>
                    <div class="portal-content">
                        <nt-grid class="grid-content" grid="dashboard.records.grid" 
                                ng-hide="viewType !== ${1 /* grid */}"></nt-grid>
                        <div class="chart-content full-width" layout="row" ng-hide="viewType === ${1 /* grid */}" 
                                ng-style="{'height' : height }"> 
                            <div flex>
                                <md-whiteframe class="md-whiteframe-24dp" flex>
                                    <md-content class="chart-bar">
                                        <nt-gridster widgets="dashboard.widgets.pageWidgets"></nt-gridster>
                                    </md-content>
                                </md-whiteframe>
                            </div>
                            <div flex="20" layout="row" class="right-bar" ng-show="viewType === ${2 /* list */}">
                                <md-whiteframe class="md-whiteframe-24dp" flex>
                                    <md-content flex>
                                        <div class="full-width"> 
                                            <md-list>
                                                <md-list-item class="md-3-line right-list" 
                                                        ng-repeat="item in dashboard.records.options.data 
                                                        track by item[dashboard.records.options.primaryField]" 
                                                        ng-mouseenter="showContextMenu = true" ng-mouseleave="showContextMenu = false">
                                                    <div class="md-list-item-text right-list-item" layout="column">
                                                        <h3>{{ item[dashboard.records.list.options.fields[0]] }}</h3>
                                                        <h4>{{ item[dashboard.records.list.options.fields[1]] }}</h4>
                                                        <p>{{ item[dashboard.records.list.options.fields[2]] }}</p>
                                                    </div>
                                                    <div class="right-list-menu" ng-show="showContextMenu">
                                                        <nt-button type="context-bar" icon-css="eye" tool-tip="View"
                                                            ng-click="dashboard.records.options.view(item, 
                                                            ${0 /* view */}, $event, dashboard.context)">
                                                        </nt-button>
                                                        <nt-button type="context-bar" icon-css="pencil-square-o" tool-tip="Edit" 
                                                            claim="{{ editClaim }} " ng-click="dashboard.records.options.view(item, 
                                                            ${1 /* save */}, $event, dashboard.context)" 
                                                            ng-hide = "editClaim === undefined">
                                                        </nt-button>
                                                        <nt-button type="context-bar" icon-css="trash" tool-tip="Delete" 
                                                            claim="{{ deleteClaim }}" ng-click="dashboard.records.options.view(item, 
                                                            ${2 /* delete */}, $event, dashboard.context)" 
                                                            ng-hide = "deleteClaim === undefined">
                                                        </nt-button>
                                                    </div>
                                                </md-list-item>
                                            </md-list>
                                        </div>
                                    </md-content>
                                </md-whiteframe>
                            </div>
                        </div>
                    </div>`;
            }
            linkFn(scope, element, instanceAttributes, $ctrl) {
                let self = $ctrl;
                // setting grid button row
                if (scope.dashboard.records === undefined) {
                    scope.viewType = 3 /* dashboardOnly */;
                }
                else {
                    // button settings
                    if (scope.dashboard.records.buttons.options === undefined) {
                        scope.dashboard.records.buttons.options = {};
                    }
                    // setting the edit and delete claim
                    scope.editClaim = scope.dashboard.records.buttons.edit ===
                        undefined ? undefined : scope.dashboard.records.buttons.edit.claim;
                    scope.deleteClaim = scope.dashboard.records.buttons.delete ===
                        undefined ? undefined : scope.dashboard.records.buttons.delete.claim;
                    // setting up grid settings
                    scope.dashboard.records.grid.options.data = scope.dashboard.records.options.data;
                    scope.dashboard.records.grid.view = scope.dashboard.records.options.view;
                    scope.dashboard.records.grid.context = scope.dashboard.context;
                    scope.dashboard.records.grid.AddButtonColumn(scope.dashboard.records.grid, scope.dashboard.records.options.primaryField, scope.editClaim, scope.deleteClaim, scope.dashboard.records.buttons.options.hideGridButtons);
                    scope.viewType = scope.viewType || 2 /* list */;
                }
                // setting the chart options based on the chart type
                self.chartOptions.set(scope.dashboard.widgets.allWidgets);
                // adding additional items to the dashboard object
                scope.dashboard.widgetSettings = self.widgetSettings;
                self.preprocessWidgets(scope.dashboard);
                // scope function
                scope.toggleListView = function () { self.toggleListView(scope); };
                scope.toggleView = function () { self.toggleView(scope); };
                scope.toggleListContextMenu = function () { self.toggleListContextMenu(scope); };
                scope.addWidget = function (ev) { self.widgetSettings(ev, undefined, scope.dashboard, undefined); };
                ;
                scope.clearWidgets = function () { self.clearWidgets(scope); };
                self.setHeight(scope);
                scope.$on("window_resize", function () {
                    self.setHeight(scope);
                });
            }
            preprocessWidgets(dashboard) {
                let self = this;
                angular.forEach(dashboard.widgets.pageWidgets, function (item) {
                    self.preprocessWidgetItem(item, dashboard);
                });
            }
            preprocessWidgetItem(widgetItem, dashboard) {
                for (let index = 0; index < dashboard.widgets.allWidgets.length; index++) {
                    if (widgetItem.widgetId === dashboard.widgets.allWidgets[index].widgetId) {
                        widgetItem.widget = dashboard.widgets.allWidgets[index];
                        widgetItem.widget.dashboard = dashboard;
                        widgetItem.widgetOptions.chart = widgetItem.widget.chart;
                        widgetItem.widget.chart.api = {};
                        break;
                    }
                }
            }
            toggleView(scope) {
                scope.viewType = scope.viewType === 0 /* dashboard */ ||
                    scope.viewType === 2 /* list */ ? 1 /* grid */ : 2 /* list */;
            }
            toggleListView(scope) {
                scope.viewType = scope.viewType === 2 /* list */ ?
                    0 /* dashboard */ : 2 /* list */;
            }
            toggleListContextMenu(scope) {
                if (scope.showContextMenu === undefined || scope.showContextMenu === false) {
                    scope.showContextMenu = true;
                }
                else {
                    scope.showContextMenu = false;
                }
            }
            setHeight(scope) {
                let self = this;
                self.$timeout(function () {
                    scope.height = self.utility.getContentHeight("portal-content", 5);
                    scope.dashboard.records.grid.height = scope.height;
                });
            }
            getWidgetTemplate(header, buttonText) {
                return `<md-dialog aria-label="${header}" class="dialog">
                        <nt-dialog form="widgetForm" header="${header}" save-text="${buttonText}">
                            <div layout="row">
                                <nt-select flex="50" form="widgetForm" label="Select Widget" control-name="widget" 
                                    ng-model="vm.model" opt-list="vm.dataOptions.widgets" opt-value="widgetId" opt-text="name" 
                                    ng-required="true"></nt-select>
                            </div>
                        </nt-dialog>
                    </md-dialog>`;
            }
            clearWidgets(scope) {
                scope.dashboard.widgets.pageWidgets.splice(0, scope.dashboard.widgets.pageWidgets.length);
            }
            refresh() {
                let self = this;
                let current = self.$state.current;
                let params = angular.copy(self.$stateParams);
                return self.$state.transitionTo(current, params, { reload: true, inherit: true, notify: true });
            }
        };
        NtDashobard = NtDashobard_1 = __decorate([
            MegaMine.directive("megamine", "ntDashobard"),
            MegaMine.inject("$timeout", "$state", "$stateParams", "MegaMine.Widget.ChartOptions", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Utility", "MegaMine.Shared.Constants")
        ], NtDashobard);
        Widget.NtDashobard = NtDashobard;
    })(Widget = MegaMine.Widget || (MegaMine.Widget = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=NtDashobard.js.map