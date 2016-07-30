declare module MegaMine.Widget.Models {
    interface IDashboardRecordButtons<TContext> {
        options?: IDashboardRecordButtonOptions;
        add: IDashboardRecordButton<TContext>;
        edit: IDashboardRecordButton<TContext>;
        delete: IDashboardRecordButton<TContext>;
    }
}