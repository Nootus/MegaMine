module megamime {
    export class appConfig
    {
        static $inject = ['$provide', '$httpProvider', '$mdThemingProvider'];
        constructor($provide: angular.auto.IProvideService, $httpProvider: ng.IHttpProvider, $mdThemingProvider: ng.material.IThemingProvider) {
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
    }
    angular.module('megamine').config(appConfig);

    export class appRun {
        static $inject = ['session']
        constructor(session) {
            session.initialize();
        }
    }
    angular.module('megamine').run(appRun);
   
    //global variables
    angular.module('megamine').value('toastr', toastr)
    angular.module('megamine').value('moment', moment)
}
