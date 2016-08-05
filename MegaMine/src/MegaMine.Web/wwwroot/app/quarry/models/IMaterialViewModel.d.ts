declare module MegaMine.Quarry.Models {
    interface IMaterialViewModel {
        productTypes: IProductTypeModel[];
        materialColours: Shared.Models.IListItem<number, string>[];
        quarries: Shared.Models.IListItem<number, string>[];
        textures: Shared.Models.IListItem<number, string>[];
        processTypes: Shared.Models.IListItem<number, string>[];

        model: IMaterialModel;
    }
}