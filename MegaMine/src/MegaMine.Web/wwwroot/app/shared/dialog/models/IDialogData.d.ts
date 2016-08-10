declare module MegaMine.Shared.Dialog.Models {
    interface IDialogData<TModel> {
        model: TModel;
        service?: any;
        error?: Shared.Models.INtException;
        validator?: Shared.Models.IDataValidator;
        dataOptions?: any;
    }
}