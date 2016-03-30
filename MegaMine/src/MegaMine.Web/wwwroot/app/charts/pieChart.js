'use strict'

angular.module('megamine').factory('pieChart', pieChart);

pieChart.$inject = [];

function pieChart() {
    var options = {
        chart: {
            type: 'pieChart',
            margin: {
                top: 30,
                right: 0,
                bottom: 0,
                left: 0
            },
            x: function (d) { return d.key; },
            y: function (d) { return d.y; },
            showLabels: true,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            showLegend: true
        }
    }

    var vm = {
        options: options
    }

    return vm;
}