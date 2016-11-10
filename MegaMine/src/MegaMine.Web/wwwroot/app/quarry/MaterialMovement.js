var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Quarry;
    (function (Quarry) {
        let MaterialMovement = class MaterialMovement {
            constructor(quarryService, gridUtility, dialogUtility, constants, messages) {
                this.quarryService = quarryService;
                this.gridUtility = gridUtility;
                this.dialogUtility = dialogUtility;
                this.constants = constants;
                this.messages = messages;
                this.yards = [];
                this.groupYards = [];
                this.movementErrorMessages = [];
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: "blockNumber", field: "blockNumber", displayName: "Block #", type: "string" },
                        { name: "productType", field: "productType", displayName: "Product Type", type: "string" },
                        { name: "colour", field: "materialColour", type: "string", displayName: "Colour" },
                        { name: "length", field: "length", type: "number", displayName: "Length" },
                        { name: "width", field: "width", type: "number", displayName: "Width" },
                        { name: "height", field: "height", type: "number", displayName: "Height" },
                        { name: "weight", field: "weight", type: "number", displayName: "Weight" },
                        {
                            name: "materialDate", field: "materialDate", displayName: "Date", type: "date",
                            cellFilter: "date:\"" + constants.dateFormat + "\""
                        },
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
            initialize() {
                const self = this;
                self.yards = self.quarryService.yardList;
                self.groupYards = self.quarryService.groupYards;
                self.quarryService.stock.splice(0, self.quarryService.stock.length);
            }
            getStock(form) {
                const self = this;
                if (form.$valid) {
                    self.noStockMessage = undefined;
                    self.quarryService.getStock(self.fromYardId).then(function () {
                        if (self.quarryService.stock.length === 0) {
                            self.noStockMessage = self.messages.noStockMessage;
                        }
                    });
                    self.currentYardId = self.fromYardId;
                }
            }
            validateToYard(form) {
                const self = this;
                if (form.toYard !== undefined && !form.toYard.$valid && self.currentYardId !== self.toYardId) {
                    form.toYard.$setValidity("dupyard", true);
                }
            }
            moveMaterial(form, ev) {
                const self = this;
                form.$submitted = true;
                // checking the from & to yard
                if (self.currentYardId === self.toYardId) {
                    self.movementErrorMessages.splice(0, self.movementErrorMessages.length);
                    self.movementErrorMessages.push({ type: "dupyard", text: self.messages.dupYard });
                    form.toYard.$setValidity("dupyard", false);
                }
                if (form.$valid) {
                    var selectedIds = [];
                    angular.forEach(self.grid.options.gridApi.selection.getSelectedRows(), function (item) {
                        selectedIds.push(item.materialId);
                    });
                    if (selectedIds.length === 0) {
                        self.dialogUtility.alert("No Materials Selected", "Please select materials to move", ev);
                    }
                    else {
                        self.quarryService.moveMaterial({
                            materialIds: selectedIds, fromYardId: self.currentYardId,
                            toYardId: self.toYardId, movementDate: self.movementDate
                        });
                    }
                }
            }
        };
        MaterialMovement = __decorate([
            MegaMine.controller("megamine", "MegaMine.Quarry.MaterialMovement"),
            MegaMine.inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.GridUtility", "MegaMine.Shared.Dialog.DialogUtility", "MegaMine.Shared.Constants", "MegaMine.Shared.Messages")
        ], MaterialMovement);
        Quarry.MaterialMovement = MaterialMovement;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=MaterialMovement.js.map