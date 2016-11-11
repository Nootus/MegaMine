declare module MegaMine.Widget.Models {
    interface IChartModel {
        typeId: number;
        type: string;
        model: any;
        data?: any;
        options: IChartOptions;
        api: any;
    }
}