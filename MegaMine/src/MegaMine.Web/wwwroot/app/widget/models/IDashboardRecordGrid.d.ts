declare module MegaMine.Widget.Models {
    interface IDashboardRecordGrid<TContext, TDataModel> {
        options: uiGrid.IGridOptions;
        data?: TDataModel[];
        view?(model: TDataModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: angular.IAngularEvent, context: TContext): void;
        context?: TContext;
    }
}