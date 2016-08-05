declare module MegaMine.Shared.Models {
    interface IListItem<TKey, TItem> {
        key: TKey;
        item: TItem;
    }
}