declare module MegaMine.Quarry.Models {
    interface IQuarrySummaryModel {
        // [productTypes: string]: number;
        QuarryId: number;
        QuarryName: string;
        Colours: string;
        TotalQuantity: number;
        TotalWeight: number;
    }
}