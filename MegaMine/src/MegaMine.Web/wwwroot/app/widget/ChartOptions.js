var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Widget;
    (function (Widget) {
        let ChartOptions = class ChartOptions {
            constructor($window) {
                this.$window = $window;
            }
            set(widgets) {
                const self = this;
                angular.forEach(widgets, function (item) {
                    item.chart.data = item.chart.model.data;
                    switch (item.chart.type) {
                        case "discreteBarChart":
                            item.chart.options = self.discreteBarChartOptions(item.chart.type, item.chart.model.xAxisDataLabels);
                            break;
                        case "stackedBarChart":
                            item.chart.options = self.stackedBarChartOptions("multiBarChart", item.chart.model.xAxisDataLabels);
                            break;
                        case "pieChart":
                            item.chart.options = self.pieChartOptions(item.chart.type, item.chart.model.xAxisDataLabels);
                            if (item.chart.model.data.length > 0) {
                                item.chart.data = item.chart.model.data[0].values;
                            }
                            break;
                        case "donutChart":
                            item.chart.options = self.donutChartOptions("pieChart", item.chart.model.xAxisDataLabels);
                            if (item.chart.model.data.length > 0) {
                                item.chart.data = item.chart.model.data[0].values;
                            }
                            break;
                        default:
                            item.chart.options = self.options(item.chart.type, item.chart.model.xAxisDataLabels);
                            break;
                    }
                    item.chart.options.chart.xAxis.axisLabel = item.chart.model.xAxisLabel;
                    item.chart.options.chart.yAxis.axisLabel = item.chart.model.yAxisLabel;
                });
            }
            options(chartType, xAxisDataLabels) {
                let self = this;
                let d3 = self.$window.d3;
                return {
                    chart: {
                        type: chartType,
                        tooltip: {
                            hideDelay: 0,
                            valueFormatter: function (d) {
                                return d3.format("d")(d);
                            },
                            headerFormatter: function (d, i) {
                                return "header";
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
                                hideDelay: 0,
                                headerFormatter: function (d, i) {
                                    return xAxisDataLabels[d];
                                }
                            }
                        },
                        xAxis: {
                            axisLabel: "X Axis",
                            showMaxMin: false,
                            axisLabelDistance: -5,
                            tickFormat: function (d) {
                                return xAxisDataLabels[d];
                            }
                        },
                        yAxis: {
                            axisLabel: "Y Axis",
                            tickFormat: function (d) {
                                return d3.format("d")(d);
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
            pieChartOptions(chartType, xAxisDataLabels) {
                const self = this;
                return angular.merge({}, self.options(chartType, xAxisDataLabels), {
                    chart: {
                        x: function (d) { return xAxisDataLabels[d.x]; }
                    }
                });
            }
            donutChartOptions(chartType, xAxisDataLabels) {
                const self = this;
                return angular.merge({}, self.options(chartType, xAxisDataLabels), {
                    chart: {
                        x: function (d) { return xAxisDataLabels[d.x]; },
                        donut: true,
                        donutRatio: 0.25
                    }
                });
            }
            discreteBarChartOptions(chartType, xAxisDataLabels) {
                const self = this;
                return angular.merge({}, self.options(chartType, xAxisDataLabels), {
                    chart: {
                        showLegend: false
                    }
                });
            }
            stackedBarChartOptions(chartType, xAxisDataLabels) {
                const self = this;
                return angular.merge({}, self.options(chartType, xAxisDataLabels), {
                    chart: {
                        stacked: true
                    }
                });
            }
        };
        ChartOptions = __decorate([
            MegaMine.service("megamine", "MegaMine.Widget.ChartOptions"),
            MegaMine.inject("$window")
        ], ChartOptions);
        Widget.ChartOptions = ChartOptions;
    })(Widget = MegaMine.Widget || (MegaMine.Widget = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=ChartOptions.js.map