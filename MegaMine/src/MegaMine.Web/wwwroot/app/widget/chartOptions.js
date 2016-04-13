'use strict'

angular.module('megamine').factory('chartOptions', chartOptions);

chartOptions.$inject = [];

function chartOptions() {
    var vm = {
        get: get,
        set: set
    }

    return vm;

    function set(widgets) {
        angular.forEach(widgets, function (item) {
            item.chart.options = get(item.chart.type);
        });
    }

    function get(chartType) {
        switch (chartType) {
            case 'DiscreteBarChart':
                return discreteBarChart();
                break;
            case 'PieChart':
                return pieChart();
                break;
            case 'LineChart':
                return lineChart();
                break;
            case 'StackedAreaChart':
                return stackedAreaChart();
                break;
            case 'MultiBarChart':
                return multiBarChart();
                break;
        }
    }

    function discreteBarChart() {
        return {
            chart: {
                type: 'discreteBarChart',
                margin: {
                    top: 40,
                    right: 20,
                    bottom: 30,
                    left: 55
                },
                x: function (d) { return d.x; },
                y: function (d) { return d.y; },
                showValues: true,
                valueFormat: function (d) {
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
        };
    }

    function pieChart() {
        return {
            chart: {
                type: 'pieChart',
                margin: {
                    top: 30,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                x: function (d) { return d.x; },
                y: function (d) { return d.y; },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                showLegend: true
            }
        };
    }

    function lineChart() {
        return {
            chart: {
                type: 'lineChart',
                tooltip: {
                    hideDelay: 0.01
                },
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
                showLegend: true
            }
        };
    }

    function stackedAreaChart() {
        return {
            chart: {
                type: 'stackedAreaChart',
                tooltip: {
                    hideDelay: 0.01
                },
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                x: function (d) { return d[0]; },
                y: function (d) { return d[1]; },
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    showMaxMin: false,
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: function (d) {
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };
    }

    function multiBarChart() {
        return {
            "chart": {
                "type": "multiBarChart",
                "margin": {
                    "top": 20,
                    "right": 20,
                    "bottom": 45,
                    "left": 45
                },
                "clipEdge": true,
                "duration": 500,
                "stacked": true,
                "xAxis": {
                    "axisLabel": "Time (ms)",
                    "showMaxMin": false
                },
                "yAxis": {
                    "axisLabel": "Y Axis",
                    "axisLabelDistance": -20
                }
            }
        }
    }
}