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
                case 'discreteBarChart':
                    item.chart.options = angular.merge({}, options(item.chart.type, item.chart.model.xAxisDataLabels), discreteBarChart(item.chart.model.xAxisDataLabels));
                    item.chart.options.chart.xAxis.axisLabel = item.chart.model.xAxisLabel;
                    item.chart.options.chart.yAxis.axisLabel = item.chart.model.yAxisLabel;
                    item.chart.data = item.chart.model.data;
                    break;
                case 'pieChart':
                    item.chart.options = angular.merge({}, options(item.chart.type, item.chart.model.xAxisDataLabels), pieChart(item.chart.model.xAxisDataLabels));
                    item.chart.data = item.chart.model.data[0].values;
                    break;
                default:
                    item.chart.options = options(item.chart.type, item.chart.model.xAxisDataLabels);
                    item.chart.options.chart.xAxis.axisLabel = item.chart.model.xAxisLabel;
                    item.chart.options.chart.yAxis.axisLabel = item.chart.model.yAxisLabel;
                    item.chart.data = item.chart.model.data;
                    break;
            }
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

    function pieChart(xAxisDataLabels) {
        return {
            chart: {
                x: function (d) { return xAxisDataLabels[d.x]; },
            }
        }
    }

    function discreteBarChart() {
        return {
            chart: {
                showLegend: false,
            }
        }
    }

    //function discreteBarChart() {
    //    return {
    //        chart: {
    //            type: 'discreteBarChart',
    //            margin: {
    //                top: 40,
    //                right: 20,
    //                bottom: 30,
    //                left: 55
    //            },
    //            x: function (d) { return d.x; },
    //            y: function (d) { return d.y; },
    //            showValues: true,
    //            valueFormat: function (d) {
    //                return d3.format(',.0f')(d);
    //            },
    //            duration: 500,
    //            xAxis: {
    //                axisLabel: 'X Axis',
    //                axisLabelDistance: -10
    //            },
    //            yAxis: {
    //                axisLabel: 'Y Axis',
    //                axisLabelDistance: -10
    //            }
    //        }
    //    };
    //}

    //function pieChart(xAxisDataLabels) {
    //    return {
    //        chart: {
    //            type: 'pieChart',
    //            tooltip: {
    //                hideDelay: 0,
    //                valueFormatter: function (d) {
    //                    return d3.format('d')(d);
    //                }
    //            },
    //            margin: {
    //                top: 30,
    //                right: 0,
    //                bottom: 0,
    //                left: 0
    //            },
    //            x: function (d) { return xAxisDataLabels[d.x]; },
    //            y: function (d) { return d.y; },
    //            showLabels: true,
    //            duration: 500,
    //            labelThreshold: 0.01,
    //            labelSunbeamLayout: true,
    //            showLegend: true
    //        }
    //    };
    //}



}