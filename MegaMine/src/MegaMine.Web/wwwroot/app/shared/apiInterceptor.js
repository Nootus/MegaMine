'use strict';

angular.module('megamine').factory('apiInterceptor', apiInterceptor);
apiInterceptor.$inject = ['$window', '$q', 'utility', 'message'];

function apiInterceptor($window, $q, utility, message) {

    var rawapiUrl = '/api/';
    var apiUrl = window.virtualDirectory + '/api/';

    return {
        request: request,
        requestError: requestError,
        response: response,
        responseError: responseError
    };

    //request success
    function request(config) {
        if (config.url.indexOf(rawapiUrl) === 0)
            config.url = window.virtualDirectory + config.url;

        if (config.url.indexOf(apiUrl) === 0) {
            navigation.isLoading = true;
            config.headers.companyId = $window.profile.companyId
        }

        // Return the config or promise.
        return config || $q.when(config);
    }

    //request error
    function requestError(rejection) {
        if (rejection.url.indexOf(apiUrl) === 0)
            navigation.isLoading = false;
        utility.showError(rejection.data.message);

        // Return the promise rejection.
        return $q.reject(rejection);
    }

    // response success
    function response(response) {
        if (response.config.url.indexOf(apiUrl) === 0) {
            navigation.isLoading = false;

            //checking whether we got our AjaxModel
            if (response.data.hasOwnProperty("result") && response.data.hasOwnProperty("message") && response.data.hasOwnProperty("model")) {
                switch (response.data.result) {
                    case 1:
                        utility.showError(response.data.message);
                        return $q.reject(response);
                        break;
                    case 2: //validation error messages
                        return $q.reject(response.data);
                        break;
                    default:
                        utility.showInfo(response.data.message);
                        response.data = response.data.model;
                        return $q.resolve(response.data)
                        break;
                }
            }
        }
        // Return the response or promise.
        return response || $q.when(response);
    }

    //response Error
    function responseError(rejection) {
        if (rejection.config.url.indexOf(apiUrl) === 0) {
            navigation.isLoading = false;
            if (rejection.status === 403) {
                utility.showError(message.unAuthorized);
            }
            else {
                utility.showError(rejection.data.message);
            }
        }
            
        // Return the promise rejection.
        return $q.reject(rejection);
    }
}


