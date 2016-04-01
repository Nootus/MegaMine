'use strict'

angular.module('megamine').factory('discreteBarChart', discreteBarChart);

discreteBarChart.$inject = [];

function discreteBarChart() {
    var options = {
        chart: {
            type: 'discreteBarChart',
            margin : {
                top: 40,
                right: 20,
                bottom: 30,
                left: 55
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.0f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'X Axis',
                axisLabelDistance: -10
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: -10
            }
        }
    }

    var vm = {
        options: options
    }

    return vm;
}