declare module MegaMine.Widget.Models {
    interface IWidgetModel {
        widgetId: number;
        name: string;
        claim: string;
        sizeX: number;
        sizeY: number;
        xAxisLabel: string;
        yAxisLabel: string;
        chart: IChartModel;
    }
}