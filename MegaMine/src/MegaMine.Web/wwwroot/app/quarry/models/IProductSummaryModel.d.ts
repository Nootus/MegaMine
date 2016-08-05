declare module MegaMine.Quarry.Models {
    interface IProductSummaryModel {
        id: string;
        productTypeId: number;
        productTypeName: string;
        quarryId: number;
        quarryName: string;
        materialColourId: number;
        colourName: string;
        processTypeId: number;
        processTypeName: string;
        materialQuantityWeight: number;
    }
}