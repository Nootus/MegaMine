declare module MegaMine.Shared.Models {
    interface IAjaxDataModel<TModel> {
        model: TModel;
        dashboard: Widget.Models.IDashboardDataModel<TModel>
    }
}