declare module uiGrid {
    interface IGridOptionsOf<TEntity> {
        gridApi?: IGridApiOf<TEntity>;
        initialize?(options: IGridOptions): IGridOptions;
    }
}