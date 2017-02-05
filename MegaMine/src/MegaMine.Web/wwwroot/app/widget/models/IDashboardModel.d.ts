declare module MegaMine.Widget.Models {

    interface IDashboardModel<TContext, TDataModel> {
        header: string;
        context: TContext;
        widgets: IDashboardWidgets;
        records?: MegaMine.Shared.DataRecord.IDataRecord<TContext, TDataModel>;
        widgetSettings?(ev: ng.IAngularEvent, widget: Models.IWidgetModel,
            dashboard: Models.IDashboardModel<TContext, TDataModel>, id: number): void;
    }
}