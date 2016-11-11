declare module MegaMine.Widget.Models {
    interface IChartOptions {
        chart: IChartOptionsChart;
    }

    interface IChartOptionsChart {
        type: string;
        tooltip: IChartOptionsTooltip;
        margin: IChartOptionsMargin;
        x: Function;
        y: Function;
        useVoronoi: boolean;
        clipEdge: boolean;
        useInteractiveGuideline: boolean;
        interactiveLayer: IChartOptionsInteractiveLayer;
        xAxis: IChartOptionsAxis;
        yAxis: IChartOptionsAxis;
        showLabels: boolean;
        duration: number;
        labelThreshold: number;
        labelSunbeamLayout: boolean;
        showLegend: boolean;
    }

    interface IChartOptionsTooltip {
        hideDelay: number;
        valueFormatter?: Function;
        headerFormatter: Function;
    }

    interface IChartOptionsMargin {
        top: number;
        right: number;
        bottom: number;
        left: number;
    }

    interface IChartOptionsInteractiveLayer {
        tooltip: IChartOptionsTooltip;
    }

    interface IChartOptionsAxis {
        axisLabel: string;
        showMaxMin?: boolean;
        axisLabelDistance: number;
        tickFormat: Function;
    }
}
