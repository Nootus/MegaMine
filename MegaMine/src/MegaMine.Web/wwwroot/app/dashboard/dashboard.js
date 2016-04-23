'use strict';
angular.module('megamine').controller('dashboard', dashboard)
dashboard.$inject = ['dashboardService', 'widgetUtility'];

function dashboard(dashboardService, widgetUtility) {

    var vm = {
        dashboard: {
            header: 'Quarry Dashboard',
            options: {
                dashboardOnly: true
            }
        }
    };

    init();

    return vm;

    function init() {
        vm.dashboard.options.gridOptions = {}; //needed as UI grid depends on this
        widgetUtility.initialize(vm.dashboard, dashboardService.dashboard);
    }

}
