'use strict';
angular.module('megamine').controller('dashboard', dashboard)
dashboard.$inject = ['dashboardService'];

function dashboard(dashboardService) {

    var vm = {
        dashboard: {
            header: 'Quarry Dashboard',
            widget: {
                widgets: dashboardService.dashboard.widgets,
                pageWidgets: dashboardService.dashboard.pageWidgets,
            }
        }
    };

    init();

    return vm;

    function init() {
    }

}
