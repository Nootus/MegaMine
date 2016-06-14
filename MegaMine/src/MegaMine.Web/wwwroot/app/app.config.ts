module MegaMine.App {
    "use strict";

    @config("megamine")
    export class Config {
        static $inject = ["$provide", "$httpProvider", "$mdThemingProvider"];
        constructor($provide: angular.auto.IProvideService, $httpProvider: ng.IHttpProvider
                                , $mdThemingProvider: ng.material.IThemingProvider) {
            // add the interceptor to the $httpProvider.
            $httpProvider.interceptors.push("apiInterceptor");
            $httpProvider.useLegacyPromiseExtensions(false);

            $mdThemingProvider.theme("default")
                .primaryPalette("grey");

            $provide.decorator("GridOptions", ["$delegate", function ($delegate) {
                let gridOptions = angular.copy($delegate);
                gridOptions.initialize = function (options) {
                    var initOptions;
                    initOptions = $delegate.initialize(options);
                    angular.extend(initOptions, { enableGridMenu: true, exporterMenuCsv: true, exporterMenuPdf: true, gridMenuShowHideColumns: true });
                    return initOptions;
                };
                return gridOptions;
            }]);
        }
    }
}
