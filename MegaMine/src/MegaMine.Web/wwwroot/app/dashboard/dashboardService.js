'use strict'

angular.module('megamine').factory('dashboardService', dashboardService);

dashboardService.$inject = ['$http'];

function dashboardService($http) {

    var service = {
        resolve: resolve,
        dashboard : {}
    };

    return service;

    function resolve() {
        return $http.get("/api/quarry/dashboard")
            .then(function (data) {
                angular.extend(service.dashboard, data.dashboard);
            });
    }

}
