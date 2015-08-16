'use strict';
angular.module('emine').controller('dashboard', dashboard)
dashboard.$inject = ['dashboardService', 'profile'];

function dashboard(dashboardService, profile) {

    var vm = {
        menu: profile.menu
    };

    init();

    return vm;

    function init() {
    }

}
