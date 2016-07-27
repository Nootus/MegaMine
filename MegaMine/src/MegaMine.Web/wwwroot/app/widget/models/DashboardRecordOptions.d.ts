declare module MegaMine.Widget.Models {
    interface IDashboardRecordOptions<TContext, TDataModel> {
        primaryField: string;
        data: Array<TDataModel>;
        view(model: TDataModel, dialogMode: MegaMine.Shared.DialogMode, ev: ng.IAngularEvent, context: TContext): void
    }
}