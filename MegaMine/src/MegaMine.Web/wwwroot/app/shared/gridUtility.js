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
        "use strict";
        var GridUtility = (function () {
            function GridUtility(uiGridConstants) {
                this.uiGridConstants = uiGridConstants;
            }
            GridUtility.prototype.initializeGrid = function (gridOptions, model) {
                this.initialize(gridOptions, model, "main-content", "main-grid", 24);
            };
            GridUtility.prototype.initializeSubGrid = function (gridOptions, model) {
                this.initialize(gridOptions, model, "main-content", "sub-grid", 41);
            };
            GridUtility.prototype.initializeDialogGrid = function (gridOptions, model) {
                this.initialize(gridOptions, model, "dialog", "dialog-grid", 100);
            };
            GridUtility.prototype.initialize = function (gridOptions, model, contentClass, gridClass, bottomOffset) {
                var self = this;
                gridOptions.enableColumnResizing = true;
                gridOptions.enableHorizontalScrollbar = self.uiGridConstants.scrollbars.NEVER;
                gridOptions.data = model;
                // resizeGrid(gridOptions, contentClass, gridClass, bottomOffset);
                // setting the grid API
                gridOptions.onRegisterApi = function (gridApi) {
                    gridOptions.gridApi = gridApi;
                };
            };
            GridUtility = __decorate([
                MegaMine.service("megamine", "MegaMine.Shared.GridUtility"),
                MegaMine.inject("uiGridConstants")
            ], GridUtility);
            return GridUtility;
        }());
        Shared.GridUtility = GridUtility;
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=GridUtility.js.map