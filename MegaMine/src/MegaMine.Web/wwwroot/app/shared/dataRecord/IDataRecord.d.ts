declare module MegaMine.Shared.DataRecord {
    interface IDataRecord<TContext, TDataModel> {
        options: IDataRecordOptions<TContext, TDataModel>;
        list: IDataRecordList;
        grid: IDataRecordGrid<TContext, TDataModel>;
        buttons: IDataRecordButtons<TContext>;
    }
}