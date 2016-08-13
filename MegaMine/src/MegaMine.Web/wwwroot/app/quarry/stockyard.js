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
        let Stockyard = class Stockyard {
            constructor(quarryService, quarryUtility, constants, dialogService, template, message) {
                this.quarryService = quarryService;
                this.quarryUtility = quarryUtility;
                this.constants = constants;
                this.dialogService = dialogService;
                this.template = template;
                this.message = message;
                this.processTypeEnum = Quarry.Models.ProcessType;
                this.yards = [];
                this.yardId = 0;
                this.productTypes = [];
                this.dialogInit = (dialogScope, dialogModel) => {
                    const self = this;
                    //making a backup copy of product types. this is need as we apply filters
                    if (self.productTypes.length === 0) {
                        angular.copy(self.quarryService.materialViewModel.productTypes, self.productTypes);
                    }
                    else {
                        self.quarryService.materialViewModel.productTypes = angular.copy(self.productTypes);
                    }
                    self.quarryUtility.addMaterialWatchers(dialogScope, dialogModel);
                };
                const self = this;
                self.grid = {
                    options: {
                        columnDefs: [
                            { name: 'blockNumber', field: 'blockNumber', displayName: 'Block #', type: 'string' },
                            { name: 'productType', field: 'productType', displayName: 'Type', type: 'string' },
                            { name: 'colour', field: 'materialColour', type: 'string', displayName: 'Colour' },
                            { name: 'texture', field: 'texture', type: 'string', displayName: 'Texture' },
                            { name: 'length', field: 'length', type: 'number', displayName: 'Length' },
                            { name: 'width', field: 'width', type: 'number', displayName: 'Width' },
                            { name: 'height', field: 'height', type: 'number', displayName: 'Height' },
                            { name: 'weight', field: 'weight', type: 'number', displayName: 'Weight' },
                            { name: 'materialDate', field: 'materialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                            { name: 'quarry', field: 'quarry', type: 'string', displayName: 'Quarry' },
                            template.getButtonColumnDefs('materialMovementId', [
                                {
                                    buttonType: 1 /* edit */,
                                    claim: 'Quarry:MaterialUpdate',
                                    ngClick: 'grid.appScope.grid.context.editStock(row.entity, $event)'
                                },
                                {
                                    buttonType: 2 /* delete */,
                                    claim: 'Quarry:MaterialDelete',
                                    ngClick: 'grid.appScope.grid.context.deleteStock(row.entity, $event)'
                                }
                            ]),
                        ]
                    },
                    data: quarryService.stock,
                    view: self.viewDialog,
                    context: self
                };
                self.quarryService.materialViewModel = {}; //resetting the view model, so that it can be populated in the edit pop ups
                self.yards = quarryService.yardList;
                self.quarryService.stock.splice(0, quarryService.stock.length);
            }
            getStock(form) {
                const self = this;
                if (form.$valid) {
                    self.noStockMessage = undefined;
                    self.quarryService.getStock(self.yardId).then(function () {
                        if (self.quarryService.stock.length === 0)
                            self.noStockMessage = self.message.noStockMessage;
                    });
                }
            }
            editStock(model, ev) {
                this.viewDialog(model, 1 /* save */, ev);
            }
            deleteStock(model, ev) {
                this.viewDialog(model, 2 /* delete */, ev);
            }
            viewDialog(model, dialogMode, ev) {
                const self = this;
                model.currentYardId = self.yardId;
                self.dialogService.show({
                    templateUrl: 'stockyard_dialog',
                    targetEvent: ev,
                    data: { model: model, dataOptions: { viewModel: self.quarryService.materialViewModel, processTypeEnum: self.processTypeEnum } },
                    dialogMode: dialogMode,
                    dialogInit: self.dialogInit,
                    resolve: {
                        resolveModel: function () {
                            if (Object.getOwnPropertyNames(self.quarryService.materialViewModel).length === 0) {
                                return self.quarryService.getMaterialViewModel();
                            }
                            else {
                                return true;
                            }
                        }
                    }
                })
                    .then(function (dialogModel) {
                    if (dialogMode === 2 /* delete */) {
                        self.quarryService.materialDelete(dialogModel.materialId, model.currentYardId).then(function () {
                            self.dialogService.hide();
                        });
                    }
                    else {
                        self.quarryUtility.clearByProcessType(dialogModel);
                        self.quarryService.materialUpdate(dialogModel).then(function () {
                            self.dialogService.hide();
                        });
                    }
                });
            }
        };
        Stockyard = __decorate([
            MegaMine.controller("megamine", "MegaMine.Quarry.Stockyard"),
            MegaMine.inject("MegaMine.Quarry.QuarryService", "MegaMine.Quarry.QuarryUtility", "MegaMine.Shared.Constants", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Template", "MegaMine.Shared.Message")
        ], Stockyard);
        Quarry.Stockyard = Stockyard;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Stockyard.js.map