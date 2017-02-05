declare module MegaMine.Shared.DataRecord {
    interface IDataRecordButtons<TContext> {
        options?: IDataRecordButtonOptions;
        add: IDataRecordButton<TContext>;
        edit?: IDataRecordButton<TContext>;
        delete?: IDataRecordButton<TContext>;
    }
}