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
        let MaterialColour = class MaterialColour {
            constructor(quarryService, dialogService) {
                this.quarryService = quarryService;
                this.dialogService = dialogService;
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: "colourName", field: "colourName", displayName: "Colour", type: "string" },
                        { name: "colourDescription", field: "colourDescription", type: "string", displayName: "Description" }
                    ]
                };
                self.dashboard = {
                    header: "Colours",
                    context: self,
                    widgets: {
                        allWidgets: quarryService.colours.widgets.allWidgets,
                        pageWidgets: quarryService.colours.widgets.pageWidgets
                    },
                    records: {
                        options: {
                            primaryField: "materialColourId",
                            data: quarryService.colours.list,
                            view: self.viewDialog
                        },
                        list: {
                            options: {
                                fields: ["colourName", "colourDescription"]
                            }
                        },
                        grid: {
                            options: gridOptions
                        },
                        buttons: {
                            add: {
                                text: "New",
                                toolTip: "New Colour",
                                claim: "Quarry:MaterialColourAdd",
                                save: self.addMaterialColour
                            },
                            edit: {
                                claim: "Quarry:MaterialColourEdit"
                            },
                            delete: {
                                claim: "Quarry:MaterialColourDelete"
                            }
                        }
                    }
                };
            }
            addMaterialColour(ev, context) {
                const self = context;
                let model = { materialColourId: 0 };
                self.viewDialog(model, 1 /* save */, ev, context);
            }
            viewDialog(model, dialogMode, ev, context) {
                const self = context;
                self.dialogService.show({
                    templateUrl: "material_colour_dialog",
                    targetEvent: ev,
                    data: { model: model },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    if (dialogMode === 2 /* delete */) {
                        self.quarryService.deleteMaterialColour(dialogModel.materialColourId).then(function () {
                            self.quarryService.getMaterialColours();
                            self.dialogService.hide();
                        });
                    }
                    else {
                        self.quarryService.saveMaterialColour(dialogModel).then(function () {
                            // update the grid values
                            if (dialogModel.materialColourId === 0) {
                                self.quarryService.getMaterialColours();
                            }
                            else {
                                model.colourName = dialogModel.colourName;
                                model.colourDescription = dialogModel.colourDescription;
                            }
                            self.dialogService.hide();
                        });
                    }
                });
            }
        };
        MaterialColour = __decorate([
            MegaMine.controller("megamine", "MegaMine.Quarry.MaterialColour"),
            MegaMine.inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Dialog.DialogService")
        ], MaterialColour);
        Quarry.MaterialColour = MaterialColour;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=MaterialColour.js.map