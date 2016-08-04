declare module MegaMine.Widget.Models {

    interface IDashboardModel<TContext, TDataModel> {
        header: string;
        context: TContext;
        widgets: IDashboardWidgets;
        records: IDashboardRecord<TContext, TDataModel>;
    }
}