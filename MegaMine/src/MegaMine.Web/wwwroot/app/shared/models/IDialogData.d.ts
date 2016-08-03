declare module MegaMine.Shared.Models {
    interface IDialogData<TModel> {
        model: TModel;
        service?: any;
        error?: INtException;
    }
}