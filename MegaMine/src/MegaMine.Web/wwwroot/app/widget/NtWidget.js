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
        "use strict";
        let NtWidget_1;
        let NtWidget = NtWidget_1 = class NtWidget {
            constructor($timeout, utility) {
                this.$timeout = $timeout;
                this.utility = utility;
                // directive attributes
                this.restrict = "E";
                this.scope = {
                    widget: "=",
                    id: "@"
                };
                this.link = this.linkFn;
                this.template = this.getTemplate();
                this.controller = NtWidget_1;
                this.controllerAs = "$ctrl";
                this.maxiInd = false;
                this.maximizeStyle = {};
                // private variables
                this.nvd3Scope = {};
                this.onReady = (childScope) => {
                    let self = this;
                    angular.extend(self.nvd3Scope, childScope);
                    self.$timeout(function () {
                        self.nvd3Scope.config.visible = true;
                    }, 100);
                };
            }
            getTemplate() {
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
            linkFn(scope, element, instanceAttributes, $ctrl) {
                const self = $ctrl;
                self.$scope = scope;
                self.widget = scope.widget;
                self.id = scope.id;
                scope.$on("gridster-resized", function (sizes, gridster) {
                    if (self.nvd3Scope !== undefined) {
                        self.$timeout(function () {
                            self.nvd3Scope.api.update();
                        }, 100);
                    }
                });
            }
            remove() {
                let self = this;
                let index = 0;
                let widgets = self.widget.dashboard.widgets.pageWidgets;
                for (index = 0; index < widgets.length; index++) {
                    if (self.id === widgets[index].dashboardPageWidgetId) {
                        break;
                    }
                }
                widgets.splice(index, 1);
            }
            refresh() {
                let self = this;
                self.nvd3Scope.api.update();
            }
            maximize() {
                const self = this;
                self.maxiInd = true;
                angular.extend(self.maximizeStyle, {
                    width: self.$scope.$parent.gridster.$element.width(),
                    height: self.utility.getContentHeight("portal-content", 50),
                    position: "absolute",
                    top: "35px",
                    left: "5px"
                });
                angular.forEach(self.$scope.$parent.gridsterItem.$element.siblings(), function (item) {
                    angular.element(item).addClass("hide");
                });
                self.$scope.$parent.gridsterItem.$element.addClass("show");
                angular.element(".chart-bar").scrollTop(0);
                self.$timeout(function () {
                    self.nvd3Scope.api.update();
                }, 500);
            }
            minimize() {
                const self = this;
                self.maxiInd = false;
                angular.forEach(self.$scope.$parent.gridsterItem.$element.siblings(), function (item) {
                    angular.element(item).removeClass("hide");
                });
                self.$scope.$parent.gridsterItem.$element.removeClass("show");
                Object.keys(self.maximizeStyle).forEach(function (key) { delete self.maximizeStyle[key]; });
                self.$timeout(function () {
                    self.nvd3Scope.api.update();
                }, 500);
            }
            ;
            openSettings(ev) {
                const self = this;
                self.widget.dashboard.widgetSettings(ev, self.widget, self.widget.dashboard, self.id);
            }
        };
        NtWidget = NtWidget_1 = __decorate([
            MegaMine.directive("megamine", "ntWidget"),
            MegaMine.inject("$timeout", "MegaMine.Shared.Utility")
        ], NtWidget);
        Widget.NtWidget = NtWidget;
    })(Widget = MegaMine.Widget || (MegaMine.Widget = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=NtWidget.js.map