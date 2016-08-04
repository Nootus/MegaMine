declare module MegaMine.Widget.Models {
    interface IDashboardRecord<TContext, TDataModel> {
        options: IDashboardRecordOptions<TContext, TDataModel>;
        list: IDashboardRecordList;
        grid: IDashboardRecordGrid;
        buttons: IDashboardRecordButtons<TContext>;
    }
}