'use strict'

angular.module('megamine').factory('lineChart', lineChart);

lineChart.$inject = [];

function lineChart() {
    var options = {
        chart: {
            type: 'lineChart',
            margin: {
                top: 40,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function (d) { return d.x; },
            y: function (d) { return d.y; },
            useInteractiveGuideline: true,
            xAxis: {
                axisLabel: 'Time (ms)',
                axisLabelDistance: -5
            },
            yAxis: {
                axisLabel: 'Voltage (v)',
                tickFormat: function (d) {
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -10
            },
            showLegend: false
        }
    }

    var vm = {
        options: options
    }

    return vm;
}