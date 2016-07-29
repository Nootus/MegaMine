var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var App;
    (function (App) {
        "use strict";
        var Config = (function () {
            function Config($provide, $httpProvider, $mdThemingProvider) {
                // add the interceptor to the $httpProvider.
                $httpProvider.interceptors.push("apiInterceptor");
                $httpProvider.useLegacyPromiseExtensions(false);
                $mdThemingProvider.theme("default")
                    .primaryPalette("grey");
                $provide.decorator("GridOptions", ["$delegate", function ($delegate) {
                        var gridOptions = angular.copy($delegate);
                        gridOptions.initialize = function (options) {
                            var initOptions;
                            initOptions = $delegate.initialize(options);
                            angular.extend(initOptions, { enableGridMenu: true, exporterMenuCsv: true, exporterMenuPdf: true, gridMenuShowHideColumns: true });
                            return initOptions;
                        };
                        return gridOptions;
                    }]);
            }
            Config.$inject = ["$provide", "$httpProvider", "$mdThemingProvider"];
            Config = __decorate([
                MegaMine.config("megamine")
            ], Config);
            return Config;
        }());
        App.Config = Config;
    })(App = MegaMine.App || (MegaMine.App = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=app.config.js.map