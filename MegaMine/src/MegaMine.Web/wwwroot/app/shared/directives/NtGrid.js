var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Shared;
    (function (Shared) {
        var Directives;
        (function (Directives) {
            let NtGrid_1;
            let NtGrid = NtGrid_1 = class NtGrid {
                constructor($timeout, uiGridConstants, utility, templateUtility) {
                    this.$timeout = $timeout;
                    this.uiGridConstants = uiGridConstants;
                    this.utility = utility;
                    this.templateUtility = templateUtility;
                    // directive attributes
                    this.restrict = "E";
                    this.replace = true;
                    this.scope = {
                        grid: "="
                    };
                    this.link = this.linkFn;
                    this.template = this.getTemplate();
                    this.controller = NtGrid_1;
                    this.controllerAs = "$ctrl";
                    this.dashboardInd = false;
                    this.AddButtonColumn = (grid, primaryField, editClaim, deleteClaim, hideGridButtons) => {
                        let self = this;
                        if (primaryField !== undefined) {
                            grid.options.columnDefs.push(self.templateUtility.getButtonDefaultColumnDefs(primaryField, editClaim, deleteClaim, hideGridButtons));
                        }
                    };
                }
                getTemplate() {
                    return `<md-content layout-padding class="grid-content" ng-style="{'height' : $ctrl.grid.height }">
                        <div class="nt-grid" ui-grid="$ctrl.grid.options" ui-grid-resize-columns ui-grid-auto-resize 
                            ui-grid-exporter ui-grid-selection ng-class="$ctrl.cssClass"></div>
                    </md-content>`;
                }
                linkFn(scope, element, instanceAttributes, $ctrl) {
                    let self = $ctrl;
                    self.grid = scope.grid;
                    if (self.grid === undefined) {
                        self.grid = { options: {} }; // work around as ui-grid is throwing error
                    }
                    else {
                        // self.grid.cssClass = self.grid.cssClass === undefined ? 'main-grid' : self.grid.cssClass;
                        self.cssClass = "main-grid";
                        self.grid.AddButtonColumn = self.AddButtonColumn; // this is used in Dashboard to add the button columns
                        self.initialize(self.grid.options, self.grid.data);
                        self.AddButtonColumn(self.grid, self.grid.primaryField, self.grid.editClaim, self.grid.deleteClaim, self.grid.hideGridButtons);
                        self.setHeight(scope);
                    }
                }
                initialize(options, data) {
                    let self = this;
                    options.enableColumnResizing = true;
                    options.enableHorizontalScrollbar = self.uiGridConstants.scrollbars.NEVER;
                    options.data = data;
                    // setting the grid API
                    options.onRegisterApi = function (gridApi) {
                        options.gridApi = gridApi;
                    };
                }
                setHeight(scope) {
                    let self = this;
                    // finding whether the grid is embed in a dashboard. In that case height is set by dashboard
                    self.$timeout(function () {
                        if (self.grid.height !== undefined) {
                            self.dashboardInd = true;
                        }
                        else {
                            self.dashboardInd = false;
                        }
                        self.setGridHeight();
                    }, 100);
                    scope.$on("window_resize", function () {
                        self.setGridHeight();
                    });
                }
                setGridHeight() {
                    let self = this;
                    let timeoutInterval = 50;
                    let bottomOffset = 10;
                    // if (self.grid.dialog) {
                    //    timeoutInterval = 250;
                    //    bottomOffset = 40;
                    // }
                    self.$timeout(function () {
                        if (!self.dashboardInd) {
                            self.grid.height = self.utility.getContentHeight("grid-content", bottomOffset);
                        }
                    }, timeoutInterval);
                }
            };
            NtGrid = NtGrid_1 = __decorate([
                MegaMine.directive("megamine", "ntGrid"),
                MegaMine.inject("$timeout", "uiGridConstants", "MegaMine.Shared.Utility", "MegaMine.Shared.Template")
            ], NtGrid);
            Directives.NtGrid = NtGrid;
        })(Directives = Shared.Directives || (Shared.Directives = {}));
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=NtGrid.js.map