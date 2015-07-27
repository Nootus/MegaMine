'use strict';

angular.module('emine').factory('apiInterceptor', apiInterceptor);
apiInterceptor.$inject = ['$q', 'utility', 'message', 'profile'];

function apiInterceptor($q, utility, message, profile) {

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
            //navigation.isLoading = true;
            config.headers.companyId = profile.companyId
        }

        // Return the config or promise.
        return config || $q.when(config);
    }

    //request error
    function requestError(rejection) {
        if (rejection.url.indexOf(apiUrl) === 0)
            navigation.isLoading = false;
        utility.showError(rejection.data.Message);

        // Return the promise rejection.
        return $q.reject(rejection);
    }

    // response success
    function response(response) {
        if (response.config.url.indexOf(apiUrl) === 0) {
            navigation.isLoading = false;

            //checking whether we got our AjaxModel
            if (response.data.hasOwnProperty("Result") && response.data.hasOwnProperty("Message") && response.data.hasOwnProperty("Model")) {
                switch (response.data.Result) {
                    case 1:
                        utility.showError(response.data.Message);
                        return $q.reject(response);
                        break;
                    case 2:
                        return $q.reject(response);
                        break;
                    default:
                        utility.showInfo(response.data.Message);
                        response.data = response.data.Model;
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
                utility.showError(rejection.data.Message);
            }
        }
            
        // Return the promise rejection.
        return $q.reject(rejection);
    }
}


