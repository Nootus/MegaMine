module MegaMine.Widget {

    @service("megamine", "MegaMine.Widget.ChartOptions")
    @inject("$window")
    export class ChartOptions {
        constructor(private $window: ng.IWindowService) {

        }

        public set(widgets: Models.IWidgetModel[]): void {
            const self: ChartOptions = this;
            angular.forEach(widgets, function (item: Models.IWidgetModel): void {
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

        private options(chartType: string, xAxisDataLabels: string[]): Models.IChartOptions {
            let self: ChartOptions = this;
            let d3: any = self.$window.d3;

            return {
                chart: {
                    type: chartType,
                    tooltip: {
                        hideDelay: 0,
                        valueFormatter: function (d: any): string {
                            return d3.format("d")(d);
                        },
                        headerFormatter: function (d: any, i: any): string {
                            return "header";
                        }
                    },
                    margin: {
                        top: 40,
                        right: 20,
                        bottom: 40,
                        left: 55
                    },
                    x: function (d: any): any { return d.x; },
                    y: function (d: any): any { return d.y; },
                    useVoronoi: false,
                    clipEdge: true,
                    useInteractiveGuideline: true,
                    interactiveLayer: {
                        tooltip: {
                            hideDelay: 0,
                            headerFormatter: function (d: number, i: number): string {
                                return xAxisDataLabels[d];
                            }
                        }
                    },
                    xAxis: {
                        axisLabel: "X Axis",
                        showMaxMin: false,
                        axisLabelDistance: -5,
                        tickFormat: function (d: number): string {
                            return xAxisDataLabels[d];
                        }
                    },
                    yAxis: {
                        axisLabel: "Y Axis",
                        tickFormat: function (d: any): any {
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

        private pieChartOptions(chartType: string, xAxisDataLabels: string[]): Models.IChartOptions {
            const self: ChartOptions = this;
            return angular.merge({}, self.options(chartType, xAxisDataLabels),
                {
                    chart: {
                        x: function (d: any): string { return xAxisDataLabels[d.x]; }
                    }
                }
            );
        }

        private donutChartOptions(chartType: string, xAxisDataLabels: string[]): Models.IChartOptions {
            const self: ChartOptions = this;
            return angular.merge({}, self.options(chartType, xAxisDataLabels),
                {
                    chart: {
                        x: function (d: any): string { return xAxisDataLabels[d.x]; },
                        donut: true,
                        donutRatio: 0.25
                    }
                }
            );
        }


        private discreteBarChartOptions(chartType: string, xAxisDataLabels: string[]): Models.IChartOptions {
            const self: ChartOptions = this;
            return angular.merge({}, self.options(chartType, xAxisDataLabels),
                {
                    chart: {
                        showLegend: false
                    }
                }
            );
        }

        private stackedBarChartOptions(chartType: string, xAxisDataLabels: string[]): Models.IChartOptions {
            const self: ChartOptions = this;
            return angular.merge({}, self.options(chartType, xAxisDataLabels),
                {
                    chart: {
                        stacked: true
                    }
                }
            );
        }
    }
}
