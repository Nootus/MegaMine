'use strict'

angular.module('megamine').factory('widgetUtility', widgetUtility);

widgetUtility.$inject = ['chart'];

function widgetUtility(chart) {
    var vm = {
        initialize: initialize
    }

    return vm;

    function initialize(dashboard, service) {
        dashboard.widgets = service.widgets;
        dashboard.pageWidgets = service.pageWidgets;
        //setting the chart options based on the chart type
        chart.set(dashboard.widgets);
    }
}