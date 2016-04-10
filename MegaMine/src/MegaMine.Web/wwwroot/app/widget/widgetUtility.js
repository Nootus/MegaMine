'use strict'

angular.module('megamine').factory('widgetUtility', widgetUtility);

widgetUtility.$inject = ['chartOptions'];

function widgetUtility(chartOptions) {
    var vm = {
        initialize: initialize
    }

    return vm;

    function initialize(dashboard) {
        chartOptions.set(dashboard.widgets);
    }
}