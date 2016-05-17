'use strict';
angular.module('megamine').controller('dashboard', dashboard)
dashboard.$inject = ['dashboardService'];

function dashboard(dashboardService) {

    var vm = {
        dashboard: {
            header: 'Quarry Dashboard',
            widgets: {
                allWidgets: dashboardService.widgets.allWidgets,
                pageWidgets: dashboardService.widgets.pageWidgets,
            }
        }
    };

    init();

    return vm;

    function init() {
    }

}
