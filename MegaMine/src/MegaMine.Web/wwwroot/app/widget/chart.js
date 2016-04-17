'use strict'

angular.module('megamine').factory('chart', chart);

chart.$inject = [];

function chart() {
    var vm = {
        set: set
    }

    return vm;

    function set(widgets) {
        angular.forEach(widgets, function (item) {
            switch (item.chart.type) {
                case 'DiscreteBarChart':
                    item.chart.options = lineChart('discreteBarChart', item.chart.model.xAxisDataLabels);
                    item.chart.options.chart.xAxis.axisLabel = item.chart.model.xAxisLabel;
                    item.chart.options.chart.yAxis.axisLabel = item.chart.model.yAxisLabel;
                    item.chart.data = item.chart.model.data;
                    break;
                case 'PieChart':
                    item.chart.options = pieChart(item.chart.model.xAxisDataLabels);
                    item.chart.data = item.chart.model.data[0].values;
                    break;
                case 'LineChart':
                    item.chart.options = lineChart('lineChart', item.chart.model.xAxisDataLabels);
                    item.chart.options.chart.xAxis.axisLabel = item.chart.model.xAxisLabel;
                    item.chart.options.chart.yAxis.axisLabel = item.chart.model.yAxisLabel;
                    item.chart.data = item.chart.model.data;
                    break;
                case 'StackedAreaChart':
                    item.chart.options = stackedAreaChart();
                    break;
                case 'MultiBarChart':
                    item.chart.options = lineChart('multiBarChart', item.chart.model.xAxisDataLabels);
                    item.chart.options.chart.xAxis.axisLabel = item.chart.model.xAxisLabel;
                    item.chart.options.chart.yAxis.axisLabel = item.chart.model.yAxisLabel;
                    item.chart.data = item.chart.model.data;
                    break;
            }
        });
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

    function pieChart(xAxisDataLabels) {
        return {
            chart: {
                type: 'pieChart',
                tooltip: {
                    hideDelay: 0,
                    valueFormatter: function (d) {
                        return d3.format('d')(d);
                    }
                },
                margin: {
                    top: 30,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                x: function (d) { return xAxisDataLabels[d.x]; },
                y: function (d) { return d.y; },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                showLegend: true
            }
        };
    }

    function lineChart(chartType, xAxisDataLabels) {
        return {
            chart: {
                type: chartType,
                tooltip: {
                    hideDelay: 0
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
                    axisLabel: 'X Axis',
                    axisLabelDistance: -5,
                    tickFormat: function (d) {
                        return xAxisDataLabels[d];
                    }
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function (d) {
                        return d3.format('d')(d);
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
            chart: {
                type: 'multiBarChart',
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 45,
                    left: 45
                },
                clipEdge: true,
                duration: 500,
                stacked: true,
                xAxis: {
                    axisLabel: 'X Axis',
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -20,
                    tickFormat: function (d) {
                        return d3.format('d')(d);
                    },
                }
            }
        }
    }
}