declare module MegaMine.Widget.Models {
    interface IPageWidgetModel {
        dashboardPageWidgetId: number;
        widgetId: number;
        widgetOptions: IWidgetOptionsModel;
        widget?: IWidgetModel;
    }
}