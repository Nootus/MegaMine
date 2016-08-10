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
        let Texture = class Texture {
            constructor(quarryService, utility, dialogService, template) {
                this.quarryService = quarryService;
                this.utility = utility;
                this.dialogService = dialogService;
                this.template = template;
                const self = this;
                self.grid = {
                    options: {
                        columnDefs: [
                            { name: "textureName", field: "textureName", displayName: "Name", type: "string" }
                        ]
                    },
                    data: quarryService.textures,
                    view: self.viewDialog,
                    context: self
                };
                self.grid.options.columnDefs.push(template.getButtonDefaultColumnDefs("textureId", "Quarry:TextureEdit", "Quarry:TextureDelete", false));
            }
            addTexture(ev, context) {
                const self = context;
                let model = { textureId: 0 };
                self.viewDialog(model, 1 /* save */, ev, context);
            }
            viewDialog(model, dialogMode, ev, context) {
                const self = context;
                self.dialogService.show({
                    templateUrl: "texture_dialog",
                    targetEvent: ev,
                    data: { model: model, service: self.quarryService },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    if (dialogMode === 2 /* delete */) {
                        self.quarryService.deleteTexture(dialogModel.textureId).then(function () {
                            self.quarryService.getTextures();
                            self.dialogService.hide();
                        });
                    }
                    else {
                        self.quarryService.saveTexture(dialogModel).then(function () {
                            // update the grid values
                            if (dialogModel.textureId === 0) {
                                self.quarryService.getTextures();
                            }
                            else {
                                model.textureName = dialogModel.textureName;
                            }
                            self.dialogService.hide();
                        });
                    }
                });
            }
        };
        Texture = __decorate([
            MegaMine.controller("megamine", "MegaMine.Quarry.Texture"),
            MegaMine.inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Utility", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Template")
        ], Texture);
        Quarry.Texture = Texture;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Texture.js.map