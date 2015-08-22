'use strict'

angular.module('emine').factory('dashboardService', dashboardService);

dashboardService.$inject = ['$http'];

function dashboardService($http) {

    var service = {
        resolve: resolve
    };

    return service;

    function resolve() {
    }

}
