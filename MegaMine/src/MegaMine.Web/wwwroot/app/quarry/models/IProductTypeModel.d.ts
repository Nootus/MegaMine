declare module MegaMine.Quarry.Models {
    interface IProductTypeModel {
        productTypeId: number;
        productTypeName: string;
        productTypeDescription: string;
        processTypeId: number;
        formula: string;
        formulaOrder: number;
        // additional properties
        formulaJson: IProductTypeFormulaModel[];
        formulaEval: string;
        formulaString: string;
    }
}