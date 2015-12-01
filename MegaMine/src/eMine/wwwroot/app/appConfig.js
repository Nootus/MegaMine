'use strict';

angular.module('megamine').config(appConfig);
appConfig.$inject = ['$httpProvider', '$mdThemingProvider'];


function appConfig($httpProvider, $mdThemingProvider) {

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('apiInterceptor');
    $httpProvider.useLegacyPromiseExtensions = false;

    $mdThemingProvider.theme('default')
      .primaryPalette('grey');
}

angular.module('megamine').run(appRun);
appRun.$inject = ['session'];
function appRun(session) {
    session.initialize();
}


//global variables
angular.module('megamine').value('toastr', toastr)
angular.module('megamine').value('moment', moment)


