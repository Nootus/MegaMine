module MegaMine.Widget {

    @directive("megamine", "ntGridster")
    @inject("$timeout")
    export class NtGridster implements ng.IDirective {

        // directive attributes
        public restrict: string = "E";
        public scope: any = {
            widgets: "="
        };

        public link: ng.IDirectiveLinkFn = this.linkFn;
        public template: string = this.getTemplate();
        public controller: any = NtGridster;
        public controllerAs: string = "$ctrl";

        constructor(private $timeout: ng.ITimeoutService) {

        }

        public getTemplate(): string {
            return `<div gridster="gridsterOptions">
                        <ul class="with-3d-shadow with-transitions">
                            <li class="widget" gridster-item="item.widgetOptions" ng-repeat="item in widgets">
                                <nt-widget id="{{item.dashboardPageWidgetId}}" widget="item.widget"></nt-nvd3>
                            </li>
                        </ul>
                    </div>`;
        }

        public linkFn(scope: INtGridsterScope, element: ng.IAugmentedJQuery,
            instanceAttributes: ng.IAttributes, $ctrl: NtGridster): void {
            scope.gridsterOptions = $ctrl.getGridsterOptions();
        }

        private getGridsterOptions(): any {
            let self: NtGridster = this;

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
                    },

                    // optional callback fired when item is resized,
                    resize: function (event, $element, widgetOptions) {
                        self.$timeout(function (): void {
                            widgetOptions.chart.api.update();
                        }, 50)
                    },

                    // optional callback fired when item is finished resizing 
                    stop: function (event, $element, widgetOptions) {
                        self.$timeout(function (): void {
                            widgetOptions.chart.api.update();
                        }, 400);
                    }
                }
            };
        }
    }

    interface INtGridsterScope extends ng.IScope {
        gridsterOptions: any;
    }
}
