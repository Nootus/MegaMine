module MegaMine.Widget {
    "use strict";
    @directive("megamine", "ntWidget")
    @inject("$timeout", "MegaMine.Shared.Utility")
    export class NtWidget implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public scope: any = {
            widget: "=",
            id: "@"
        };

        public link: ng.IDirectiveLinkFn = this.linkFn;
        public template: string = this.getTemplate();
        public controller: typeof NtWidget = NtWidget;
        public controllerAs: string = "$ctrl";

        // scope variables
        public id: number;
        public widget: Models.IWidgetModel;
        public maxiInd: boolean = false;
        public maximizeStyle: any = {};

        // private variables
        private nvd3Scope: any = {};
        private $scope: any;

        constructor(private $timeout: ng.ITimeoutService, private utility: MegaMine.Shared.Utility) {

        }

        public getTemplate(): string {
            return `<div class="box" ng-style="$ctrl.maximizeStyle">
                    <div class="box-header">
                        <h3>{{ widget.name }}</h3>
                            <div class="box-header-btns pull-right">
                                <a title="Settings" ng-click="$ctrl.openSettings($event)"><i class="fa fa-cog"></i></a>
                                <a title="Maximize" ng-click="$ctrl.maximize()" ng-hide="$ctrl.maxiInd"><i class="fa fa-maximize"></i></a>
                                <a title="Minimize" ng-click="$ctrl.minimize()" ng-show="$ctrl.maxiInd"><i class="fa fa-minimize"></i></a>
                                <a title="Refresh" ng-click="$ctrl.refresh()"><i class="fa fa-refresh"></i></a>
                                <a title="Remove widget" ng-click="$ctrl.remove()"><i class="fa fa-trash"></i></a>
                            </div>
                    </div>
                    <div class="box-content">
                        <nvd3 options="widget.chart.options"
                              data="widget.chart.data"
                              api="widget.chart.api"
                              config="{ visible: false }"
                              on-ready="$ctrl.onReady">
                        </nvd3>
                    </div>
                </div>`;
        }

        public linkFn(scope: ng.IScope, element: ng.IAugmentedJQuery, instanceAttributes: ng.IAttributes, $ctrl: NtWidget): void {
            const self: NtWidget = $ctrl;

            let scopewidget = "widget";
            let scopeid = "id";

            self.$scope = scope;
            self.widget = scope[scopewidget];
            self.id = parseInt(scope[scopeid], 10);

            scope.$on("gridster-resized", function (sizes: ng.IAngularEvent, gridster: any): void {
                if (self.nvd3Scope !== undefined) {
                    self.$timeout(function (): void {
                        self.nvd3Scope.api.update();
                    }, 100);
                }
            });
        }

        public onReady = (childScope: ng.IScope): void => {
            let self: NtWidget = this;

            angular.extend(self.nvd3Scope, childScope);

            self.$timeout(function (): void {
                self.nvd3Scope.config.visible = true;
            }, 100);
        };

        public remove(): void {
            let self: NtWidget = this;
            let index: number = 0;
            let widgets: Models.IPageWidgetModel[] = self.widget.dashboard.widgets.pageWidgets;
            for (index = 0; index < widgets.length; index++) {
                if (self.id === widgets[index].dashboardPageWidgetId) {
                    break;
                }
            }
            widgets.splice(index, 1);
        }

        public refresh(): void {
            let self: NtWidget = this;
            self.nvd3Scope.api.update();
        }

        public maximize(): void {
            const self: NtWidget = this;

            self.maxiInd = true;

            angular.extend(self.maximizeStyle, {
                width: self.$scope.$parent.gridster.$element.width(),
                height: self.utility.getContentHeight("portal-content", 50),
                position: "absolute",
                top: "35px",
                left: "5px"
            });

            angular.forEach(self.$scope.$parent.gridsterItem.$element.siblings(), function (item: string): void {
                angular.element(item).addClass("hide");
            });
            self.$scope.$parent.gridsterItem.$element.addClass("show");
            angular.element(".chart-bar").scrollTop(0);
            self.$timeout(function (): void {
                self.nvd3Scope.api.update();
            }, 500);
        }

        public minimize(): void {
            const self: NtWidget = this;

            self.maxiInd = false;
            angular.forEach(self.$scope.$parent.gridsterItem.$element.siblings(), function (item: string): void {
                angular.element(item).removeClass("hide");
            });
            self.$scope.$parent.gridsterItem.$element.removeClass("show");
            Object.keys(self.maximizeStyle).forEach(function (key: string): void { delete self.maximizeStyle[key]; });
            self.$timeout(function (): void {
                self.nvd3Scope.api.update();
            }, 500);
        };

        public openSettings(ev: ng.IAngularEvent): void {
            const self: NtWidget = this;
            self.widget.dashboard.widgetSettings(ev, self.widget, self.widget.dashboard, self.id);
        }
    }
}