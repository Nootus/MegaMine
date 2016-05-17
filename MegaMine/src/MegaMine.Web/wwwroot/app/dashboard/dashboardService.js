'use strict'

angular.module('megamine').factory('dashboardService', dashboardService);

dashboardService.$inject = ['$http'];

function dashboardService($http) {

    var service = {
        resolve: resolve,
        widgets: {}
    };

    return service;

    function resolve() {
        return $http.get("/api/quarry/dashboard")
            .then(function (data) {
                angular.extend(service.widgets, data.dashboard);
            });
    }

}
