module MegaMine.Shared {

    @service("megamine", "MegaMine.Shared.GridUtility")
    @inject("uiGridConstants")
    export class GridUtility {

        constructor (private uiGridConstants: uiGrid.IUiGridConstants) {
        }

        public initializeGrid(gridOptions: uiGrid.IGridOptions, model: any): void {
            this.initialize(gridOptions, model, "main-content", "main-grid", 24);
        }

        public initializeSubGrid(gridOptions: uiGrid.IGridOptions, model: any): void {
            this.initialize(gridOptions, model, "main-content", "sub-grid", 41);
        }

        public initializeDialogGrid(gridOptions: uiGrid.IGridOptions, model: any): void {
            this.initialize(gridOptions, model, "dialog", "dialog-grid", 100);
        }

        private initialize(gridOptions: uiGrid.IGridOptions, model: any, contentClass: string, gridClass: string,
                            bottomOffset: number): void {
            let self: GridUtility = this;
            gridOptions.enableColumnResizing = true;
            gridOptions.enableHorizontalScrollbar = self.uiGridConstants.scrollbars.NEVER;
            gridOptions.data = model;
            // resizeGrid(gridOptions, contentClass, gridClass, bottomOffset);

            // setting the grid API
            gridOptions.onRegisterApi = function(gridApi: uiGrid.IGridApi): void {
                gridOptions.gridApi = gridApi;
            };
        }

            // function resizeGrid(gridOptions, contentClass, gridClass, bottomOffset, currentHeight) {
            //    gridOptions.height = utility.getContentHeight(contentClass, gridClass, bottomOffset);
            //    if (gridOptions.height !== currentHeight || currentHeight === undefined) {
            //        $timeout(function () {
            //            resizeGrid(gridOptions, contentClass, gridClass, bottomOffset, gridOptions.height);
            //        }, 50);
            //    }
            // }

    }
}