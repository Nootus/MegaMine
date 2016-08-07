declare module MegaMine.Widget.Models {
    interface IDashboardDataModel<TModel> {
        list: TModel[];
        widgets: IDashboardWidgets;
    }
}