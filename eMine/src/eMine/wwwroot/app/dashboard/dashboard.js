'use strict';
angular.module('emine').controller('dashboard', dashboard)
dashboard.$inject = ['$http', 'dashboardService'];

function dashboard($http, dashboardService) {

    var vm = {
        testClick: testClick
    };

    init();

    return vm;

    function init() {
    }

    function testClick() {
        return $http.get("/api/fleet/ManufacturersGet")
            .success(function (data) {
                alert("Success");
            })
    }

}
