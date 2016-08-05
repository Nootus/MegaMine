declare module MegaMine.Quarry.Models {
    interface IProductSummaryViewModel {
        quarries: Shared.Models.IListItem<number, string>[];
        productTypes: Shared.Models.IListItem<number, string>[];
        colours: Shared.Models.IListItem<number, string>[];
        summary: IProductSummaryModel;
    }
}