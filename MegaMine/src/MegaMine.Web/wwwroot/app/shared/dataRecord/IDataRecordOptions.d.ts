declare module MegaMine.Shared.DataRecord {
    interface IDataRecordOptions<TContext, TDataModel> {
        primaryField: string;
        data: Array<TDataModel>;
        view(model: TDataModel, dialogMode: Shared.Dialog.Models.DialogMode, ev: ng.IAngularEvent, context: TContext): void;
    }
}