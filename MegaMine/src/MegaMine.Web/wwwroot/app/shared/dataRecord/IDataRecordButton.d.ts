declare module MegaMine.Shared.DataRecord {
    interface IDataRecordButton<TContext> {
        text?: string;
        toolTip?: string;
        claim: string;
        save?(ev: ng.IAngularEvent, context: TContext): void;
    }
}