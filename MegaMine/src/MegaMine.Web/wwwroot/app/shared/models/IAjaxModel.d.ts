declare module MegaMine.Shared.Models {
    interface IAjaxModel<TModel> extends IAjaxDataModel<TModel> {
        result: AjaxResult;
        message: string;
    }
}