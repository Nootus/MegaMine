module MegaMine.Shared.Directives {

    @directive("megamine", "ntGrid")
    @inject("$timeout", "uiGridConstants", "MegaMine.Shared.Utility", "MegaMine.Shared.Template")
    export class NtGrid<TContext, TDataModel> implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public replace: boolean = true;
        public scope: any = {
            grid: "="
        };

        public link: ng.IDirectivePrePost = {
            pre: this.preLinkFn,
            post: this.postLinkFn
        };
        public template: string = this.getTemplate();
        public controller: typeof NtGrid = NtGrid;
        public controllerAs: string = "$ctrl";

        // scope variables
        public grid: Widget.Models.IDashboardRecordGrid<TContext, TDataModel>;
        public dashboardInd: boolean = false;
        public cssClass: string;

        constructor(private $timeout: ng.ITimeoutService, private uiGridConstants: uiGrid.IUiGridConstants,
            private utility: Shared.Utility, private templateUtility: Shared.Template) {

        }

        public getTemplate(): string {
            return `<md-content layout-padding class="grid-content" ng-style="{'height' : $ctrl.grid.height }">
                        <div class="nt-grid" ui-grid="$ctrl.grid.options" ui-grid-resize-columns ui-grid-auto-resize 
                            ui-grid-exporter ui-grid-selection ng-class="$ctrl.cssClass"></div>
                    </md-content>`;
        }

        public preLinkFn(scope: INtGridScope<TContext, TDataModel>, element: ng.IAugmentedJQuery,
            instanceAttributes: ng.IAttributes, $ctrl: NtGrid<TContext, TDataModel>): void {
            let self: NtGrid<TContext, TDataModel> = $ctrl;

            self.grid = scope.grid;
        }

        public postLinkFn(scope: INtGridScope<TContext, TDataModel>, element: ng.IAugmentedJQuery,
            instanceAttributes: ng.IAttributes, $ctrl: NtGrid<TContext, TDataModel>): void {
            let self: NtGrid<TContext, TDataModel> = $ctrl;

            if (self.grid === undefined) {
                self.grid = { options: {} }; // work around as ui-grid is throwing error
            } else {
                // self.grid.cssClass = self.grid.cssClass === undefined ? 'main-grid' : self.grid.cssClass;
                self.cssClass = "main-grid";
                self.grid.AddButtonColumn = self.AddButtonColumn; // this is used in Dashboard to add the button columns
                self.initialize(self.grid.options, self.grid.data);
                self.AddButtonColumn(
                    self.grid, self.grid.primaryField, self.grid.editClaim, self.grid.deleteClaim, self.grid.hideGridButtons);

                self.setHeight(scope);
            }
        }

        private initialize(options: uiGrid.IGridOptions, data: TDataModel[]): void {
            let self: NtGrid<TContext, TDataModel> = this;

            options.enableColumnResizing = true;
            options.enableHorizontalScrollbar = self.uiGridConstants.scrollbars.NEVER;
            options.data = data;

            // setting the grid API
            options.onRegisterApi = function (gridApi: uiGrid.IGridApi): void {
                options.gridApi = gridApi;
            };
        }

        private AddButtonColumn = (grid: Widget.Models.IDashboardRecordGrid<TContext, TDataModel>, primaryField: string,
            editClaim: string, deleteClaim: string, hideGridButtons:string): void => {
            let self: NtGrid<TContext, TDataModel> = this;
            if (primaryField !== undefined) {
                grid.options.columnDefs.push(
                    self.templateUtility.getButtonDefaultColumnDefs(primaryField, editClaim, deleteClaim, hideGridButtons));
            }
        };

        private setHeight(scope: INtGridScope<TContext, TDataModel>): void  {
            let self: NtGrid<TContext, TDataModel> = this;
            // finding whether the grid is embed in a dashboard. In that case height is set by dashboard
            self.$timeout(function (): void {
                if (self.grid.height !== undefined) {
                    self.dashboardInd = true;
                } else {
                    self.dashboardInd = false;
                }
                self.setGridHeight();
            }, 100);

            scope.$on("window_resize", function (): void {
                self.setGridHeight();
            });
        }

        private setGridHeight(): void {
            let self: NtGrid<TContext, TDataModel> = this;

            let timeoutInterval: number = 50;
            let bottomOffset: number = 10;

            // if (self.grid.dialog) {
            //    timeoutInterval = 250;
            //    bottomOffset = 40;
            // }

            self.$timeout(function (): void {
                if (!self.dashboardInd) {
                    self.grid.height = self.utility.getContentHeight("grid-content", bottomOffset);
                }
            }, timeoutInterval);
        }
    }

    interface INtGridScope<TContext, TDataModel> extends ng.IScope {
        grid: Widget.Models.IDashboardRecordGrid<TContext, TDataModel>;
    }
}



