declare module MegaMine.Widget.Models {
    interface IDashboardRecordButton<TContext> {
        text?: string;
        toolTip?: string;
        claim: string;
        save?(ev: ng.IAngularEvent, context: TContext): void;
    }
}