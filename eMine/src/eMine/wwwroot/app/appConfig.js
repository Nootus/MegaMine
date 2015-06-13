'use strict';

angular.module('emine').config(appConfig);
appConfig.$inject = ['$httpProvider', '$mdThemingProvider'];


function appConfig($httpProvider, $mdThemingProvider) {

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('apiInterceptor');

    $mdThemingProvider.theme('default')
      .primaryPalette('grey');
}

angular.module('emine').run(appRun);
appRun.$inject = ['session'];
function appRun(session) {
    session.initialize();
}


//global variables
angular.module('emine').value('toastr', toastr)
angular.module('emine').value('moment', moment)


