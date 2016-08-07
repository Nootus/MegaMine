module MegaMine.Quarry {

    @controller("megamine", "MegaMine.Quarry.Texture")
    @inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Utility", "MegaMine.Shared.DialogService", "MegaMine.Shared.Template")
    export class Texture {

        private grid;

        constructor(private quarryService, private utility, private dialogService, private template: Shared.Template) {
            let self = this;

            self.grid = {
                options: <uiGrid.IGridOptions>{
                    columnDefs: [
                        { name: "textureName", field: "textureName", displayName: "Name", type: "string" }
                    ]
                },
                data: <Models.ITextureModel[]>quarryService.textures
            };

            self.grid.view = self.viewDialog;
            self.grid.context = self;
            self.grid.options.columnDefs.push(template.getButtonDefaultColumnDefs("textureId", "Quarry:TextureEdit", "Quarry:TextureDelete", false));
        }

        private addTexture(ev: angular.IAngularEvent, context: Texture): void {
            let self = context;

            let model: Models.ITextureModel = <Models.ITextureModel>{ textureId: 0 }
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, context);
        }

        public viewDialog(model: Models.ITextureModel, dialogMode, ev: angular.IAngularEvent, context: Texture): void {
            let self: Texture = context;

            self.dialogService.show({
                templateUrl: "texture_dialog",
                targetEvent: ev,
                data: { model: model, service: self.quarryService },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: Models.ITextureModel) {
                    if (dialogMode === Shared.Models.ButtonType.delete) {
                        self.quarryService.deleteTexture(dialogModel.textureId).then(function () {
                            self.quarryService.getTextures();
                            self.dialogService.hide();
                        });
                    }
                    else {
                        self.quarryService.saveTexture(dialogModel).then(function () {
                            //update the grid values
                            if (dialogModel.textureId === 0) {
                                self.quarryService.getTextures();
                            }
                            else {
                                model.textureName = dialogModel.textureName
                            }

                            self.dialogService.hide();
                        });
                    }
                });
        }
    }
}