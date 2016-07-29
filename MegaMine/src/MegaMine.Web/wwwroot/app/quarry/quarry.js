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
        "use strict";
        var Quarry = (function () {
            function Quarry(quarryService, utility, constants, dialogService, template) {
                this.quarryService = quarryService;
                this.utility = utility;
                this.constants = constants;
                this.dialogService = dialogService;
                this.template = template;
                var self = this;
                self.gridOptions = {
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
                        pageWidgets: self.quarryService.quarries.widgets.pageWidgets,
                    },
                    records: {
                        options: {
                            primaryField: "quarryId",
                            data: self.quarryService.quarries.list,
                            view: self.viewDialog,
                        },
                        list: {
                            options: {
                                fields: ["quarryName", "colours", "location"]
                            },
                        },
                        grid: {
                            options: self.gridOptions
                        },
                        buttons: {
                            add: {
                                text: "New",
                                toolTip: "New Quarry",
                                claim: "Quarry:QuarryAdd",
                                save: self.addQuarry,
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
            Quarry.prototype.addQuarry = function (ev, context) {
                var self = context;
                var model = { quarryId: 0, colourIds: [] };
                self.viewDialog(model, self.constants.enum.dialogMode.save, ev, context);
            };
            Quarry.prototype.viewDialog = function (model, dialogMode, ev, context) {
                var self = context;
                self.dialogService.show({
                    templateUrl: "quarry_dialog",
                    targetEvent: ev,
                    data: { model: model, service: self.quarryService },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    if (dialogMode === self.constants.enum.buttonType.delete) {
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
            };
            Quarry = __decorate([
                MegaMine.controller("megamine", "MegaMine.Quarry.Quarry"),
                MegaMine.inject("quarryService", "MegaMine.Shared.Utility", "MegaMine.Shared.Constants", "dialogService", "template")
            ], Quarry);
            return Quarry;
        }());
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Quarry.js.map