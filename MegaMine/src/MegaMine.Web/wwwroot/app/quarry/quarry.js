var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
                    widgets: {
                        allWidgets: this.quarryService.quarries.widgets.allWidgets,
                        pageWidgets: this.quarryService.quarries.widgets.pageWidgets,
                    },
                    records: {
                        options: {
                            primaryField: "quarryId",
                            data: this.quarryService.quarries.list,
                            view: this.viewDialog,
                            self: this
                        },
                        list: {
                            options: {
                                fields: ["quarryName", "colours", "location"]
                            },
                        },
                        grid: {
                            options: this.gridOptions
                        },
                        buttons: {
                            add: {
                                text: "New",
                                toolTip: "New Quarry",
                                claim: "Quarry:QuarryAdd",
                                save: this.addQuarry,
                                self: this
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
            Quarry.prototype.addQuarry = function (ev) {
                var self = this.self;
                var model = { quarryId: 0, colourIds: [] };
                self.viewDialog(model, self.constants.enum.dialogMode.save, ev);
            };
            Quarry.prototype.viewDialog = function (model, dialogMode, ev) {
                var self = this.self;
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
                            //update the grid values
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
                MegaMine.inject("quarryService", "utility", "constants", "dialogService", "template"), 
                __metadata('design:paramtypes', [Object, Object, Object, Object, Object])
            ], Quarry);
            return Quarry;
        }());
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=quarry.js.map