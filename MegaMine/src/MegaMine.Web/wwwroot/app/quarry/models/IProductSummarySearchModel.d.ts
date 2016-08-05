declare module MegaMine.Quarry.Models {
    interface IProductSummarySearchModel {
        quarryIds: number[];
        productTypeIds: number[];
        materialColourIds: number[];
        startDate: Date;
        endDate: Date;
    }
}