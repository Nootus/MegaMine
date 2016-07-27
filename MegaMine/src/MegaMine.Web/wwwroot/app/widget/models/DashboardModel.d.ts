declare module MegaMine.Widget.Models {

    interface IDashboardModel<TContext> {
        header: string;
        context: TContext;
        widgets: IDashboardWidgets;
    }
}