declare module MegaMine.Quarry.Models {
    interface IStockModel extends IMaterialModel {
        productType: string;
        materialColour: string;
        texture: string;
        quarry: string;

        // used in Add Material
        index: number;
    }
}