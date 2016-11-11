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
            }
            getTemplate() {
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
                </div>`;
            }
            linkFn(scope, element, instanceAttributes, $ctrl) {
                let nvd3Scope = {};
                scope.remove = function () {
                    var index = 0;
                    var widgets = scope.widget.dashboard.pageWidgets;
                    for (var index = 0; index < widgets.length; index++) {
                        if (scope.id == widgets[index].dashboardPageWidgetId)
                            break;
                    }
                    widgets.splice(index, 1);
                };
                scope.refresh = function () {
                    nvd3Scope.api.update();
                };
                $ctrl.nvd3(scope, nvd3Scope);
                $ctrl.mixiMini(scope, nvd3Scope);
                scope.openSettings = function (ev) { $ctrl.openSettings(scope, ev); };
            }
            nvd3(scope, nvd3Scope) {
                let self = this;
                scope.onReady = function (childScope, element) {
                    angular.extend(nvd3Scope, childScope);
                    self.$timeout(function () {
                        nvd3Scope.config.visible = true;
                    }, 100);
                };
                scope.$on('gridster-resized', function (sizes, gridster) {
                    if (nvd3Scope !== undefined) {
                        self.$timeout(function () {
                            nvd3Scope.api.update();
                        }, 100);
                    }
                });
            }
            mixiMini(scope, nvd3Scope) {
                let self = this;
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
                        angular.element(item).addClass('hide');
                    });
                    scope.$parent.gridsterItem.$element.addClass('show');
                    angular.element(".chart-bar").scrollTop(0);
                    self.$timeout(function () {
                        nvd3Scope.api.update();
                    }, 500);
                };
                scope.minimize = function () {
                    scope.maxiInd = false;
                    angular.forEach(scope.$parent.gridsterItem.$element.siblings(), function (item) {
                        angular.element(item).removeClass('hide');
                    });
                    scope.$parent.gridsterItem.$element.removeClass('show');
                    Object.keys(scope.maximizeStyle).forEach(function (key) { delete scope.maximizeStyle[key]; });
                    self.$timeout(function () {
                        nvd3Scope.api.update();
                    }, 500);
                };
            }
            openSettings(scope, ev) {
                scope.widget.dashboard.widgetSettings(ev, scope.widget, scope.widget.dashboard, scope.id);
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