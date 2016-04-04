var megamime;
(function (megamime) {
    var appConfig = (function () {
        function appConfig($provide, $httpProvider, $mdThemingProvider) {
            // Add the interceptor to the $httpProvider.
            $httpProvider.interceptors.push('apiInterceptor');
            $httpProvider.useLegacyPromiseExtensions(false);
            $mdThemingProvider.theme('default')
                .primaryPalette('grey');
            $provide.decorator('GridOptions', ['$delegate', function ($delegate) {
                    var gridOptions;
                    gridOptions = angular.copy($delegate);
                    gridOptions.initialize = function (options) {
                        var initOptions;
                        initOptions = $delegate.initialize(options);
                        angular.extend(initOptions, { enableGridMenu: true, exporterMenuCsv: true, exporterMenuPdf: true, gridMenuShowHideColumns: true });
                        return initOptions;
                    };
                    return gridOptions;
                }]);
        }
        appConfig.$inject = ['$provide', '$httpProvider', '$mdThemingProvider'];
        return appConfig;
    }());
    megamime.appConfig = appConfig;
    angular.module('megamine').config(appConfig);
    var appRun = (function () {
        function appRun(session) {
            session.initialize();
        }
        appRun.$inject = ['session'];
        return appRun;
    }());
    megamime.appRun = appRun;
    angular.module('megamine').run(appRun);
    //global variables
    angular.module('megamine').value('toastr', toastr);
    angular.module('megamine').value('moment', moment);
})(megamime || (megamime = {}));
//# sourceMappingURL=appConfig.js.map