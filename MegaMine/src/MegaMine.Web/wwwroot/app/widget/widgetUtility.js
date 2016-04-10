'use strict'

angular.module('megamine').factory('widgetUtility', widgetUtility);

widgetUtility.$inject = ['chartOptions'];

function widgetUtility(chartOptions) {
    var vm = {
        initialize: initialize
    }

    return vm;

    function initialize(dashboard, service) {
        dashboard.widgets = service.widgets;
        dashboard.pageWidgets = service.pageWidgets;
        //setting the chart options based on the chart type
        chartOptions.set(dashboard.widgets);
    }
}