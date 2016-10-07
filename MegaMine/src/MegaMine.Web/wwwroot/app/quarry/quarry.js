var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Quarry;
    (function (Quarry_1) {
        let Quarry = class Quarry {
            constructor(quarryService, utility, dialogService) {
                this.quarryService = quarryService;
                this.utility = utility;
                this.dialogService = dialogService;
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: "quarryName", field: "quarryName", displayName: "Name", type: "string" },
                        { name: "colour", field: "colours", displayName: "Colour", type: "string" },
                        { name: "location", field: "location", displayName: "Location", type: "string" }
                    ]
                };
                self.dashboard = {
                    header: "Quarries",
                    context: self,
                    widgets: {
                        allWidgets: self.quarryService.quarries.widgets.allWidgets,
                        pageWidgets: self.quarryService.quarries.widgets.pageWidgets
                    },
                    records: {
                        options: {
                            primaryField: "quarryId",
                            data: self.quarryService.quarries.list,
                            view: self.viewDialog
                        },
                        list: {
                            options: {
                                fields: ["quarryName", "colours", "location"]
                            }
                        },
                        grid: {
                            options: gridOptions
                        },
                        buttons: {
                            add: {
                                text: "New",
                                toolTip: "New Quarry",
                                claim: "Quarry:QuarryAdd",
                                save: self.addQuarry
                            },
                            edit: {
                                claim: "Quarry:QuarryEdit"
                            },
                            delete: {
                                claim: "Quarry:QuarryDelete"
                            }
                        }
                    }
                };
            }
            addQuarry(ev, context) {
                const self = context;
                let model = { quarryId: 0, colourIds: [] };
                self.viewDialog(model, 1 /* save */, ev, context);
            }
            viewDialog(model, dialogMode, ev, context) {
                const self = context;
                self.dialogService.show({
                    templateUrl: "quarry_dialog",
                    targetEvent: ev,
                    data: { model: model, service: self.quarryService },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    if (dialogMode === 2 /* delete */) {
                        self.quarryService.deleteQuarry(dialogModel.quarryId).then(function () {
                            self.quarryService.getQuarries();
                            self.dialogService.hide();
                        });
                    }
                    else {
                        self.quarryService.saveQuarry(dialogModel).then(function () {
                            // update the grid values
                            if (dialogModel.quarryId === 0) {
                                self.quarryService.getQuarries();
                            }
                            else {
                                model.quarryName = dialogModel.quarryName;
                                model.location = dialogModel.location;
                                angular.extend(model.colourIds, dialogModel.colourIds);
                                model.colours = self.utility.getListItem(self.quarryService.colourListItems, dialogModel.colourIds[0]);
                            }
                            self.dialogService.hide();
                        });
                    }
                });
            }
        };
        Quarry = __decorate([
            MegaMine.controller("megamine", "MegaMine.Quarry.Quarry"),
            MegaMine.inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Utility", "MegaMine.Shared.Dialog.DialogService")
        ], Quarry);
        Quarry_1.Quarry = Quarry;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Quarry.js.map