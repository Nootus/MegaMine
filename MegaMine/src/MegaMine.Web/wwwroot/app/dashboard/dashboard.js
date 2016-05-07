'use strict';
angular.module('megamine').controller('dashboard', dashboard)
dashboard.$inject = ['dashboardService'];

function dashboard(dashboardService) {

    var vm = {
        dashboard: {
            header: 'Quarry Dashboard',
            widgets: {
                allWidgets: dashboardService.dashboard.allWidgets,
                pageWidgets: dashboardService.dashboard.pageWidgets,
            }
        }
    };

    init();

    return vm;

    function init() {
    }

}
