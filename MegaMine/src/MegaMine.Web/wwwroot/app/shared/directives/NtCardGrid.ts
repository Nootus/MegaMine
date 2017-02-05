module MegaMine.Shared.Directives {

    @directive("megamine", "ntCardGrid")
    @inject("$timeout", "$state", "$stateParams", "MegaMine.Shared.Dialog.DialogService",
        "MegaMine.Shared.Utility", "MegaMine.Shared.Constants")
    export class NtCardGrid<TContext, TDataModel> implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public scope: any = {
            dashboard: "=",
            headerClass: "@"
        };

        public link: ng.IDirectiveLinkFn = this.linkFn;
        public template: string = this.getTemplate();
        public controller: typeof NtCardGrid = NtCardGrid;
        public controllerAs: string = "$ctrl";

        constructor(private $timeout: ng.ITimeoutService, private $state: ng.ui.IStateService, private $stateParams: ng.ui.IStateOptions,
            private dialogService: MegaMine.Shared.Dialog.DialogService<number>,
            private utility: MegaMine.Shared.Utility, private constants: MegaMine.Shared.Constants) {

        }

        public getTemplate(): string {
            return `<nt-toolbar header="{{dashboard.header}}" class="command-bar {{headerClass}}">
                        <nt-button type="command-bar" icon-css="list" tool-tip="List View" text="List" ng-click="toggleView()" 
                            ng-show="viewType === ${ Models.CardGridViewType.grid }">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="th" tool-tip="Grid View" text="Grid" ng-click="toggleView()" 
                            ng-show="viewType === ${ Models.CardGridViewType.card }" >
                        </nt-button>
                        <nt-button type="command-bar" icon-css="refresh" tool-tip="Refresh Page" text="Refresh" ng-click="$ctrl.refresh()">
                        </nt-button>
                        <nt-button type="command-bar" icon-css="plus" tool-tip="{{dashboard.records.buttons.add.toolTip}}" 
                            text="{{dashboard.records.buttons.add.text}}" 
                            ng-click="dashboard.records.buttons.add.save($event, dashboard.context)" 
                            claim="{{dashboard.records.buttons.add.claim}}">
                        </nt-button>
                    </nt-toolbar>
                    <div class="portal-content">
                        <nt-grid class="grid-content" grid="dashboard.records.grid" 
                                ng-hide="viewType !== ${ Models.CardGridViewType.grid }"></nt-grid>
                        <div class="chart-content full-width" layout="row" ng-hide="viewType === ${ Models.CardGridViewType.grid }" 
                                ng-style="{'height' : height }"> 
                            <div flex="20" layout="row" class="right-bar">
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
                                                            ${ Shared.Dialog.Models.DialogMode.view}, $event, dashboard.context)">
                                                        </nt-button>
                                                        <nt-button type="context-bar" icon-css="pencil-square-o" tool-tip="Edit" 
                                                            claim="{{ editClaim }} " ng-click="dashboard.records.options.view(item, 
                                                            ${ Shared.Dialog.Models.DialogMode.save}, $event, dashboard.context)" 
                                                            ng-hide = "editClaim === undefined">
                                                        </nt-button>
                                                        <nt-button type="context-bar" icon-css="trash" tool-tip="Delete" 
                                                            claim="{{ deleteClaim }}" ng-click="dashboard.records.options.view(item, 
                                                            ${ Shared.Dialog.Models.DialogMode.delete}, $event, dashboard.context)" 
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

        public linkFn(scope: INtCardGridScope<TContext, TDataModel>, element: ng.IAugmentedJQuery,
            instanceAttributes: ng.IAttributes, $ctrl: NtCardGrid<TContext, TDataModel>): void {
            let self: NtCardGrid<TContext, TDataModel> = $ctrl;

            // setting grid button row
                // button settings
                if (scope.dashboard.records.buttons.options === undefined) {
                    scope.dashboard.records.buttons.options = <MegaMine.Shared.DataRecord.IDataRecordButtonOptions>{};
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
                scope.viewType = scope.viewType || Models.CardGridViewType.card;

            // scope function
            scope.toggleView = function (): void { self.toggleView(scope); };
            scope.toggleListContextMenu = function (): void { self.toggleListContextMenu(scope); };

            self.setHeight(scope);

            scope.$on("window_resize", function (): void {
                self.setHeight(scope);
            });
        }

        private toggleView(scope: INtCardGridScope<TContext, TDataModel>): void {
            scope.viewType = scope.viewType === Models.CardGridViewType.card ? Models.CardGridViewType.grid : Models.CardGridViewType.card;
        }

        private toggleListContextMenu(scope: INtCardGridScope<TContext, TDataModel>): void {
            if (scope.showContextMenu === undefined || scope.showContextMenu === false) {
                scope.showContextMenu = true;
            } else {
                scope.showContextMenu = false;
            }
        }

        private setHeight(scope: INtCardGridScope<TContext, TDataModel>): void {
            let self: NtCardGrid<TContext, TDataModel> = this;
            self.$timeout(function (): void {
                scope.height = self.utility.getContentHeight("portal-content", 5);
                if (scope.dashboard.records !== undefined && scope.dashboard.records.grid !== undefined) {
                    scope.dashboard.records.grid.height = scope.height;
                }
            });
        }

        public refresh(): ng.IPromise<any> {
            let self: NtCardGrid<TContext, TDataModel> = this;
            let current: ng.ui.IState = self.$state.current;
            let params: ng.ui.IStateOptions = angular.copy(self.$stateParams);
            return self.$state.transitionTo(current, params, { reload: true, inherit: true, notify: true });
        }
    }

    interface INtCardGridScope<TContext, TDataModel> extends ng.IScope {
        dashboard: MegaMine.Widget.Models.IDashboardModel<TContext, TDataModel>;
        height: string;
        showContextMenu: boolean;
        viewType: Models.CardGridViewType;
        editClaim: string;
        deleteClaim: string;
        toggleView(): void;
        toggleListContextMenu(): void;
        refresh(): ng.IPromise<any>;
    }
}
