'use strict';

angular.module('megamine').config(appConfig);
appConfig.$inject = ['$provide', '$httpProvider', '$mdThemingProvider'];


function appConfig($provide, $httpProvider, $mdThemingProvider) {

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('apiInterceptor');
    $httpProvider.useLegacyPromiseExtensions = false;

    $mdThemingProvider.theme('default')
      .primaryPalette('grey');


    $provide.decorator('GridOptions', ['$delegate', function ($delegate) {
        var gridOptions;
        gridOptions = angular.copy($delegate);
        gridOptions.initialize = function (options) {
            var initOptions;
            initOptions = $delegate.initialize(options);
            angular.extend(initOptions, { enableGridMenu: true, exporterMenuCsv: true, exporterMenuPdf: false, gridMenuShowHideColumns: false });
            return initOptions;
        };
        return gridOptions;
    }]);
}

angular.module('megamine').run(appRun);
appRun.$inject = ['session'];
function appRun(session) {
    session.initialize();
}


//global variables
angular.module('megamine').value('toastr', toastr)
angular.module('megamine').value('moment', moment)


