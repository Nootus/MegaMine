declare module MegaMine.Widget.Models {
    interface IDashboardRecordButtons<TContext> {
        add: IDashboardRecordButton<TContext>;
        edit: IDashboardRecordButton<TContext>;
        delete: IDashboardRecordButton<TContext>;
    }
}