module MegaMine.Quarry {

    @controller("megamine", "MegaMine.Quarry.MaterialMovement")
    @inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.GridUtility", "MegaMine.Shared.Dialog.DialogUtility",
        "MegaMine.Shared.Constants", "MegaMine.Shared.Message")
    export class MaterialMovement {

        // variables used in the view
        public grid: Widget.Models.IDashboardRecordGrid<MaterialMovement, Models.IStockModel>;
        public yards: Models.IYardModel[] = [];
        public groupYards: Models.IYardModel[] = [];
        public fromYardId: number;
        public toYardId: number;
        public currentYardId: number;
        public movementDate: Date;
        public movementErrorMessages: Shared.Models.IErrorMessage[] = [];
        public noStockMessage: string;

        constructor(private quarryService: QuarryService, private gridUtility: Shared.GridUtility,
            private dialogUtility: Shared.Dialog.DialogUtility, private constants: Shared.Constants,
            private message: Shared.Message) {
            const self: MaterialMovement = this;
            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "blockNumber", field: "blockNumber", displayName: "Block #", type: "string" },
                    { name: "productType", field: "productType", displayName: "Product Type", type: "string" },
                    { name: "colour", field: "materialColour", type: "string", displayName: "Colour" },
                    { name: "length", field: "length", type: "number", displayName: "Length" },
                    { name: "width", field: "width", type: "number", displayName: "Width" },
                    { name: "height", field: "height", type: "number", displayName: "Height" },
                    { name: "weight", field: "weight", type: "number", displayName: "Weight" },
                    { name: "materialDate", field: "materialDate", displayName: "Date", type: "date", cellFilter: "date:\"" + constants.dateFormat + "\"" },
                    { name: "quarry", field: "quarry", type: "string", displayName: "Quarry" }
                ]
            };

            self.grid = {
                options: gridOptions,
                data: self.quarryService.stock,
                context: self
            };

            self.initialize();
        }

        private initialize() {
            const self: MaterialMovement = this;
            self.yards = self.quarryService.yardList;
            self.groupYards = self.quarryService.groupYards;
            self.quarryService.stock.splice(0, self.quarryService.stock.length);
        }

        public getStock(form) {
            const self: MaterialMovement = this;
            if (form.$valid) {
                self.noStockMessage = undefined;
                self.quarryService.getStock(self.fromYardId).then(function () {
                    if (self.quarryService.stock.length === 0)
                        self.noStockMessage = self.message.noStockMessage;
                });
                self.currentYardId = self.fromYardId;
            }
        }

        public validateToYard(form) {
            const self: MaterialMovement = this;
            if (form.toYard !== undefined && !form.toYard.$valid && self.currentYardId !== self.toYardId) {
                form.toYard.$setValidity("dupyard", true);
            }
        }

        public moveMaterial(form, ev) {
            const self: MaterialMovement = this;
            form.$submitted = true;

            //checking the from & to yard
            if (self.currentYardId === self.toYardId) {
                self.movementErrorMessages.splice(0, self.movementErrorMessages.length);
                self.movementErrorMessages.push({ type: "dupyard", text: self.message.dupYard });

                form.toYard.$setValidity("dupyard", false);
            }

            if (form.$valid) {
                var selectedIds = [];
                angular.forEach(self.grid.options.gridApi.selection.getSelectedRows(), function (item) {
                    selectedIds.push(item.materialId)
                });

                if (selectedIds.length === 0) {
                    self.dialogUtility.alert("No Materials Selected", "Please select materials to move", ev);
                }
                else {
                    self.quarryService.moveMaterial({ materialIds: selectedIds, fromYardId: self.currentYardId, toYardId: self.toYardId, movementDate: self.movementDate })
                }
            }
        }
    }

}
