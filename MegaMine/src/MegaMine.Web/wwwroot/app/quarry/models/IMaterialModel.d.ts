declare module MegaMine.Quarry.Models {
    interface IMaterialModel {
        materialId: number;
        blockNumber: string;
        quarryId: number;
        yardId: number;
        materialColourId: number;
        productTypeId: number;
        processTypeId: number;
        textureId : number;
        dimensions: string;
        length : number;
        width : number;
        height : number;
        weight : number;
        materialDate: Date

        //UI 
        currentYardId: number;
   }
}