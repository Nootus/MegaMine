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
            item.chart.data = item.chart.model.data;
            switch (item.chart.type) {
                case 'discreteBarChart':
                    item.chart.options = discreteBarChartOptions(item.chart.type, item.chart.model.xAxisDataLabels);
                    break;
                case 'stackedBarChart':
                    item.chart.options = stackedBarChartOptions('multiBarChart', item.chart.model.xAxisDataLabels);
                    break;
                case 'pieChart':
                    item.chart.options = pieChartOptions(item.chart.type, item.chart.model.xAxisDataLabels);
                    item.chart.data = item.chart.model.data[0].values;
                    break;
                case 'donutChart':
                    item.chart.options = donutChartOptions('pieChart', item.chart.model.xAxisDataLabels);
                    item.chart.data = item.chart.model.data[0].values;
                    break;
                default:
                    item.chart.options = options(item.chart.type, item.chart.model.xAxisDataLabels);
                    break;
            }

            item.chart.options.chart.xAxis.axisLabel = item.chart.model.xAxisLabel;
            item.chart.options.chart.yAxis.axisLabel = item.chart.model.yAxisLabel;

        });
    }

    function options(chartType, xAxisDataLabels) {
        return {
            chart: {
                type: chartType,
                tooltip: {
                    hideDelay: 0.01,
                    valueFormatter: function (d) {
                        return d3.format('d')(d);
                    },
                    headerFormatter: function (d, i) {
                        return 'header';
                    }
                },
                margin: {
                    top: 40,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function (d) { return d.x; },
                y: function (d) { return d.y; },
                useVoronoi: false,
                clipEdge: true,
                useInteractiveGuideline: true,
                interactiveLayer: {
                    tooltip: {
                        hideDelay: 0.01,
                        headerFormatter: function (d, i) {
                            return xAxisDataLabels[d];
                        }
                    }
                },
                xAxis: {
                    axisLabel: 'X Axis',
                    showMaxMin: false,
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
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                showLegend: true
            }
        };
    }

    function pieChartOptions(chartType, xAxisDataLabels) {

        return angular.merge({}, options(chartType, xAxisDataLabels), 
            {
                chart: {
                    x: function (d) { return xAxisDataLabels[d.x]; },
                }
            }
        );
    }

    function donutChartOptions(chartType, xAxisDataLabels) {

        return angular.merge({}, options(chartType, xAxisDataLabels),
            {
                chart: {
                    x: function (d) { return xAxisDataLabels[d.x]; },
                    donut: true,
                    donutRatio: 0.25
                }
            }
        );
    }


    function discreteBarChartOptions(chartType, xAxisDataLabels) {
        return angular.merge({}, options(chartType, xAxisDataLabels),
            {
                chart: {
                    showLegend: false,
                }
            }
        );
    }

    function stackedBarChartOptions(chartType, xAxisDataLabels) {
        return angular.merge({}, options(chartType, xAxisDataLabels),
            {
                chart: {
                    stacked: true,
                }
            }
        );

    }
}