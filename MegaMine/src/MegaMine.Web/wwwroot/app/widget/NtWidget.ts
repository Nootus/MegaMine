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

        constructor(private $timeout: ng.ITimeoutService, private utility: MegaMine.Shared.Utility) {

        }

        public getTemplate(): string {
            return `<div class="box" ng-style="maximizeStyle">
                    <div class="box-header">
                        <h3>{{ widget.name }}</h3>
                            <div class="box-header-btns pull-right">
                                <a title="Settings" ng-click="openSettings($event)"><i class="fa fa-cog"></i></a>
                                <a title="Maximize" ng-click="maximize()" ng-hide="maxiInd"><i class="fa fa-maximize"></i></a>
                                <a title="Minimize" ng-click="minimize()" ng-show="maxiInd"><i class="fa fa-minimize"></i></a>
                                <a title="Refresh" ng-click="refresh()"><i class="fa fa-refresh"></i></a>
                                <a title="Remove widget" ng-click="remove()"><i class="fa fa-trash"></i></a>
                            </div>
                    </div>
                    <div class="box-content">
                        <nvd3 options="widget.chart.options"
                              data="widget.chart.data"
                              api="widget.chart.api"
                              config="{ visible: false }"
                              on-ready="onReady">
                        </nvd3>
                    </div>
                </div>`
        }

        public linkFn(scope: INtWidgetScope, element: ng.IAugmentedJQuery,
            instanceAttributes: ng.IAttributes, $ctrl: NtWidget): void {
            let nvd3Scope: any = {};

            scope.remove = function () {
                var index = 0;
                var widgets = scope.widget.dashboard.pageWidgets;
                for (var index = 0; index < widgets.length; index++) {
                    if (scope.id == widgets[index].dashboardPageWidgetId)
                        break;
                }
                widgets.splice(index, 1);
            }

            scope.refresh = function () {
                nvd3Scope.api.update();
            }

            $ctrl.nvd3(scope, nvd3Scope);
            $ctrl.mixiMini(scope, nvd3Scope);

            scope.openSettings = function (ev: ng.IAngularEvent): void { $ctrl.openSettings(scope, ev); };
        }

        private nvd3(scope: INtWidgetScope, nvd3Scope: any): void {
            let self: NtWidget = this;
            scope.onReady = function (childScope: any, element: any): void {
                angular.extend(nvd3Scope, childScope);

                self.$timeout(function (): void {
                    nvd3Scope.config.visible = true;
                }, 100)
            }

            scope.$on('gridster-resized', function (sizes: ng.IAngularEvent, gridster: any): void {
                if (nvd3Scope !== undefined) {
                    self.$timeout(function (): void {
                        nvd3Scope.api.update();
                    }, 100)
                }
            })
        }

        private mixiMini(scope: any, nvd3Scope: any): void {
            let self: NtWidget = this;
            scope.maxiInd = false;
            scope.maximizeStyle = {};

            scope.maximize = function () {
                scope.maxiInd = true;

                angular.extend(scope.maximizeStyle, {
                    width: scope.$parent.gridster.$element.width(),
                    height: self.utility.getContentHeight('portal-content', 50),
                    position: 'absolute',
                    top: '35px',
                    left: '5px'
                });

                angular.forEach(scope.$parent.gridsterItem.$element.siblings(), function (item) {
                    angular.element(item).addClass('hide')
                })
                scope.$parent.gridsterItem.$element.addClass('show');
                angular.element(".chart-bar").scrollTop(0);
                self.$timeout(function () {
                    nvd3Scope.api.update();
                }, 500)
            }

            scope.minimize = function () {
                scope.maxiInd = false;
                angular.forEach(scope.$parent.gridsterItem.$element.siblings(), function (item) {
                    angular.element(item).removeClass('hide')
                })
                scope.$parent.gridsterItem.$element.removeClass('show');
                Object.keys(scope.maximizeStyle).forEach(function (key) { delete scope.maximizeStyle[key]; });
                self.$timeout(function () {
                    nvd3Scope.api.update();
                }, 500)
            }
        }

        private openSettings(scope: INtWidgetScope, ev: any): void {
            scope.widget.dashboard.widgetSettings(ev, scope.widget, scope.widget.dashboard, scope.id)
        }
    }

    interface INtWidgetScope extends ng.IScope {
        id: string;
        widget: any;
        onReady: Function;
        remove: Function;
        refresh: Function;
        openSettings: Function;
    }
}