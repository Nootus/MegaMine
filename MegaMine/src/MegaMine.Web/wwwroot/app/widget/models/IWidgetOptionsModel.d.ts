declare module MegaMine.Widget.Models {
    interface IWidgetOptionsModel {
        columns: number;
        rows: number;
        sizeX: number;
        sizeY: number;

        chart?: IChartModel; // for back refencing the Chart
    }
}