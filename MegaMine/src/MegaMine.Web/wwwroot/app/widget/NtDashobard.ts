module MegaMine.Widget {

    @directive("megamine", "ntDashobard")
    @inject("$timeout", "$state", "$stateParams", "MegaMine.Widget.ChartOptions", "MegaMine.Shared.Dialog.DialogService",
        "MegaMine.Shared.Utility", "MegaMine.Shared.Constants")
    export class NtDashobard<TContext, TDataModel> implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public scope: any = {
            dashboard: "=",
            headerClass: "@"
        };

        public link: ng.IDirectiveLinkFn = this.linkFn;
        public template: string = this.getTemplate();
        public controller: typeof NtDashobard = NtDashobard;
        public controllerAs: string = "$ctrl";

        constructor(private $timeout: ng.ITimeoutService, private $state: ng.ui.IStateService, private $stateParams: ng.ui.IStateOptions,
            private chartOptions: MegaMine.Widget.ChartOptions, private dialogService: MegaMine.Shared.Dialog.DialogService<number>,
            private utility: MegaMine.Shared.Utility, private constants: MegaMine.Shared.Constants) {

        }

        public getTemplate(): string {
            return `<nt-toolbar header="{{dashboard.header}}" class="command-bar {{headerClass}}">
                        <nt-button type="command-bar" icon-css="plus-square-o" tool-tip="Add Widget" text="Widget" 
                            ng-click="addWidget($event)" ng-hide="viewType === ${ Models.DashboardViewType.grid }">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="ban" tool-tip="Clear Widgets" text="Clear" ng-click="clearWidgets()" 
                            ng-hide="viewType === ${ Models.DashboardViewType.grid }">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="list" tool-tip="Toogle List" text="List" ng-click="toggleListView()" 
                            ng-hide="viewType === ${ Models.DashboardViewType.grid } || 
                                                                    viewType === ${ Models.DashboardViewType.dashboardOnly }">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="tachometer" tool-tip="Dashboard View" text="Dashboard" 
                            ng-click="toggleView()" ng-hide="viewType !== ${ Models.DashboardViewType.grid }">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="th" tool-tip="Grid View" text="Grid" ng-click="toggleView()" 
                            ng-hide="viewType === ${ Models.DashboardViewType.grid } || 
                                                                    viewType === ${ Models.DashboardViewType.dashboardOnly }">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="refresh" tool-tip="Refresh Page" text="Refresh" ng-click="refresh()">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="plus" tool-tip="{{dashboard.records.buttons.add.toolTip}}" 
                            text="{{dashboard.records.buttons.add.text}}" 
                            ng-click="dashboard.records.buttons.add.save($event, dashboard.context)" 
                            claim="{{dashboard.records.buttons.add.claim}}" 
                            ng-hide="viewType === ${ Models.DashboardViewType.dashboardOnly }">
                        </nt-button>
                    </nt-toolbar>
                    <div class="portal-content">
                        <nt-grid class="grid-content" grid="dashboard.records.grid" 
                                ng-hide="viewType !== ${ Models.DashboardViewType.grid }"></nt-grid>
                        <div class="chart-content full-width" layout="row" ng-hide="viewType === ${ Models.DashboardViewType.grid }" 
                                ng-style="{'height' : height }"> 
                            <div flex>
                                <md-whiteframe class="md-whiteframe-24dp" flex>
                                    <md-content class="chart-bar">
                                        <nt-gridster widgets="dashboard.widgets.pageWidgets"></nt-gridster>
                                    </md-content>
                                </md-whiteframe>
                            </div>
                            <div flex="20" layout="row" class="right-bar" ng-show="viewType === ${ Models.DashboardViewType.list }">
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
                                                        <nt-button type="context- bar" icon-css="eye" tool-tip="View"
                                                            ng-click="dashboard.records.options.view(item, 
                                                            ${ Shared.Dialog.Models.DialogMode.view }, $event, dashboard.context)">
                                                        </nt-button>
                                                        <nt-button type="context- bar" icon-css="pencil- square - o" tool-tip="Edit" 
                                                            claim="{{ editClaim }} " ng-click="dashboard.records.options.view(item, 
                                                            ${ Shared.Dialog.Models.DialogMode.save }, $event, dashboard.context)" 
                                                            ng-hide = "editClaim === undefined">
                                                        </nt-button>
                                                        <nt-button type="context- bar" icon-css="trash" tool-tip="Delete" 
                                                            claim="{{ deleteClaim }}" ng-click="dashboard.records.options.view(item, 
                                                            ${ Shared.Dialog.Models.DialogMode.delete }, $event, dashboard.context)" 
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

        public linkFn(scope: INtDashboardScope<TContext, TDataModel>, element: ng.IAugmentedJQuery,
            instanceAttributes: ng.IAttributes, $ctrl: NtDashobard<TContext, TDataModel>): void {
            let self: NtDashobard<TContext, TDataModel> = $ctrl;

            // setting grid button row
            if (scope.dashboard.records === undefined) {
                scope.viewType = Models.DashboardViewType.dashboardOnly;
            } else {
                // button settings
                if (scope.dashboard.records.buttons.options === undefined) {
                    scope.dashboard.records.buttons.options = <Models.IDashboardRecordButtonOptions>{};
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
                scope.dashboard.records.grid.AddButtonColumn(scope.dashboard.records.grid, scope.dashboard.records.options.primaryField,
                                            scope.editClaim, scope.deleteClaim, scope.dashboard.records.buttons.options.hideGridButtons);
                scope.viewType = scope.viewType || Models.DashboardViewType.list;
            }

            // setting the chart options based on the chart type
            self.chartOptions.set(scope.dashboard.widgets.allWidgets);

            // adding additional items to the dashboard object
            scope.dashboard.widgetSettings = self.widgetSettings;

            self.preprocessWidgets(scope.dashboard);

            // scope function
            scope.toggleListView = function(): void { self.toggleListView(scope); };
            scope.toggleView = function(): void { self.toggleView(scope); };
            scope.toggleListContextMenu = function(): void { self.toggleListContextMenu(scope); };
            scope.refresh = self.refresh;
            scope.addWidget = function(ev: ng.IAngularEvent): void { self.widgetSettings(ev, undefined, scope.dashboard, undefined); };;
            scope.clearWidgets = function(): void { self.clearWidgets(scope); };

            self.setHeight(scope);

            scope.$on("window_resize", function (): void {
                self.setHeight(scope);
            });
        }

        private preprocessWidgets(dashboard: Models.IDashboardModel<TContext, TDataModel>): void {
            let self: NtDashobard<TContext, TDataModel> = this;
            angular.forEach(dashboard.widgets.pageWidgets, function (item: Models.IPageWidgetModel): void {
                self.preprocessWidgetItem(item, dashboard);
            });
        }

        private preprocessWidgetItem(widgetItem: Models.IPageWidgetModel, dashboard: Models.IDashboardModel<TContext, TDataModel>): void {
            for (let index: number = 0; index < dashboard.widgets.allWidgets.length; index++) {
                if (widgetItem.widgetId === dashboard.widgets.allWidgets[index].widgetId) {
                    widgetItem.widget = dashboard.widgets.allWidgets[index];
                    widgetItem.widget.dashboard = dashboard;
                    widgetItem.widgetOptions.chart = widgetItem.widget.chart;
                    widgetItem.widget.chart.api = {};
                    break;
                }
            }
        }

        private toggleView(scope: INtDashboardScope<TContext, TDataModel>): void {
            scope.viewType = scope.viewType === Models.DashboardViewType.dashboard ||
                scope.viewType === Models.DashboardViewType.list ? Models.DashboardViewType.grid : Models.DashboardViewType.list;
        }

        private toggleListView(scope: INtDashboardScope<TContext, TDataModel>): void {
            scope.viewType = scope.viewType === Models.DashboardViewType.list ?
                                                    Models.DashboardViewType.dashboard : Models.DashboardViewType.list;
        }

        private toggleListContextMenu(scope: INtDashboardScope<TContext, TDataModel>): void {
            if (scope.showContextMenu === undefined || scope.showContextMenu === false) {
                scope.showContextMenu = true;
            } else {
                scope.showContextMenu = false;
            }
        }

        private setHeight(scope: INtDashboardScope<TContext, TDataModel>): void {
            let self: NtDashobard<TContext, TDataModel> = this;
            self.$timeout(function (): void {
                scope.height = self.utility.getContentHeight("portal-content", 5);
                scope.dashboard.records.grid.height = scope.height;
            });
        }

        private widgetSettings(ev: ng.IAngularEvent, widget: Models.IWidgetModel, dashboard: Models.IDashboardModel<TContext, TDataModel>,
                    id: number): void {
            let self: NtDashobard<TContext, TDataModel> = this;
            let header: string = "Add Widget";
            let buttonText: string = "Add";
            let dialogMode: Shared.Dialog.Models.DialogMode = Shared.Dialog.Models.DialogMode.save;

            if (widget !== undefined) {
                header = widget.name;
                buttonText = "Save";
                dialogMode = Shared.Dialog.Models.DialogMode.save;
            }
            self.dialogService.show({
                template: self.getWidgetTemplate(header, buttonText),
                targetEvent: ev,
                data: { model: id, dataOptions: { widgets: dashboard.widgets.allWidgets } },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: number): void {
                    let index: number = 0;
                    for (index = 0; index < dashboard.widgets.allWidgets.length; index++) {
                        if (dialogModel === dashboard.widgets.allWidgets[index].widgetId) {
                            break;
                        }
                    }

                    let widgetItem: Models.IPageWidgetModel = {
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
                        let current: number;
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
        }

        private getWidgetTemplate(header: string, buttonText: string): string {
            return `<md-dialog aria-label="${ header }" class="dialog">
                        <nt-dialog form="widgetForm" header="${ header }" save-text="${ buttonText }">
                            <div layout="row">
                                <nt-select flex="50" form="widgetForm" label="Select Widget" control-name="widget" 
                                    ng-model="vm.model" opt-list="vm.dataOptions.widgets" opt-value="widgetId" opt-text="name" 
                                    ng-required="true"></nt-select>
                            </div>
                        </nt-dialog>
                    </md-dialog>`;
        }

        private clearWidgets(scope: INtDashboardScope<TContext, TDataModel>): void {
            scope.dashboard.widgets.pageWidgets.splice(0, scope.dashboard.widgets.pageWidgets.length);
        }

        private refresh(): ng.IPromise<any> {
            let self: NtDashobard<TContext, TDataModel> = this;
            let current: ng.ui.IState = self.$state.current;
            let params: ng.ui.IStateOptions = angular.copy(self.$stateParams);
            return self.$state.transitionTo(current, params, { reload: true, inherit: true, notify: true });
        }
    }

    interface INtDashboardScope<TContext, TDataModel> extends ng.IScope {
        dashboard: Models.IDashboardModel<TContext, TDataModel>;
        height: string;
        showContextMenu: boolean;
        viewType: Models.DashboardViewType;
        editClaim: string;
        deleteClaim: string;
        toggleListView(): void;
        toggleView(): void;
        toggleListContextMenu(): void;
        refresh(): ng.IPromise<any>;
        clearWidgets(): void;
        addWidget(ev: ng.IAngularEvent): void;
    }
}
