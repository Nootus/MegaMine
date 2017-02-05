declare module MegaMine.Shared.DataRecord {
    interface IDataRecordGrid<TContext, TDataModel> {
        options: uiGrid.IGridOptions;
        data?: TDataModel[];
        view?(model: TDataModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: angular.IAngularEvent, context: TContext): void;
        context?: TContext;
        primaryField?: string;
        editClaim?: string;
        deleteClaim?: string;
        hideGridButtons?: string;
        height?: string;
        AddButtonColumn?(grid: IDataRecordGrid<TContext, TDataModel>, primaryField: string,
            editClaim: string, deleteClaim: string, hideGridButtons: string): void;
    }
}