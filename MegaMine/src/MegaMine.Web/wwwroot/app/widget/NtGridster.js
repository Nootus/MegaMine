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
        let NtGridster_1;
        let NtGridster = NtGridster_1 = class NtGridster {
            constructor($timeout) {
                this.$timeout = $timeout;
                // directive attributes
                this.restrict = "E";
                this.scope = {
                    widgets: "="
                };
                this.link = this.linkFn;
                this.template = this.getTemplate();
                this.controller = NtGridster_1;
                this.controllerAs = "$ctrl";
            }
            getTemplate() {
                return `<div gridster="$ctrl.gridsterOptions">
                        <ul class="with-3d-shadow with-transitions">
                            <li class="widget" gridster-item="item.widgetOptions" ng-repeat="item in widgets">
                                <nt-widget id="{{item.dashboardPageWidgetId}}" widget="item.widget"></nt-nvd3>
                            </li>
                        </ul>
                    </div>`;
            }
            linkFn(scope, element, instanceAttributes, $ctrl) {
                $ctrl.gridsterOptions = $ctrl.getGridsterOptions();
            }
            getGridsterOptions() {
                let self = this;
                return {
                    margins: [35, 5],
                    mobileModeEnabled: false,
                    draggable: {
                        handle: "h3"
                    },
                    resizable: {
                        enabled: true,
                        handles: ["n", "e", "s", "w", "ne", "se", "sw", "nw"],
                        // optional callback fired when resize is started
                        start: function (event, $element, widgetOptions) {
                            // no code 
                        },
                        // optional callback fired when item is resized,
                        resize: function (event, $element, widgetOptions) {
                            self.$timeout(function () {
                                widgetOptions.chart.api.update();
                            }, 50);
                        },
                        // optional callback fired when item is finished resizing 
                        stop: function (event, $element, widgetOptions) {
                            self.$timeout(function () {
                                widgetOptions.chart.api.update();
                            }, 400);
                        }
                    }
                };
            }
        };
        NtGridster = NtGridster_1 = __decorate([
            MegaMine.directive("megamine", "ntGridster"),
            MegaMine.inject("$timeout")
        ], NtGridster);
        Widget.NtGridster = NtGridster;
    })(Widget = MegaMine.Widget || (MegaMine.Widget = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=NtGridster.js.map