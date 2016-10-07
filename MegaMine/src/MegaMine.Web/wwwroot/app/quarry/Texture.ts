module MegaMine.Quarry {

    @controller("megamine", "MegaMine.Quarry.Texture")
    @inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Utility", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Template")
    export class Texture {

        private grid: Widget.Models.IDashboardRecordGrid<Texture, Models.ITextureModel>;

        constructor(private quarryService: QuarryService, private utility: Shared.Utility,
                        private dialogService: Shared.Dialog.DialogService<Models.ITextureModel>, private template: Shared.Template) {
            const self: Texture = this;

            self.grid = {
                options: {
                    columnDefs: [
                        { name: "textureName", field: "textureName", displayName: "Name", type: "string" },
                        template.getButtonDefaultColumnDefs("textureId", "Quarry:TextureEdit", "Quarry:TextureDelete", false)
                    ]
                },
                data: quarryService.textures,
                view: self.viewDialog,
                context: self
            };
        }

        public addTexture(ev: angular.IAngularEvent, context: Texture): void {
            const self: Texture = context;

            let model: Models.ITextureModel = <Models.ITextureModel>{ textureId: 0 };
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, context);
        }

        public viewDialog(model: Models.ITextureModel, dialogMode: Shared.Dialog.Models.DialogMode,
                            ev: angular.IAngularEvent, context: Texture): void {
            const self: Texture = context;

            self.dialogService.show({
                templateUrl: "texture_dialog",
                targetEvent: ev,
                data: { model: model, service: self.quarryService },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: Models.ITextureModel): void {
                    if (dialogMode === Shared.Dialog.Models.DialogMode.delete) {
                        self.quarryService.deleteTexture(dialogModel.textureId).then(function (): void {
                            self.quarryService.getTextures();
                            self.dialogService.hide();
                        });
                    } else {
                        self.quarryService.saveTexture(dialogModel).then(function (): void {
                            // update the grid values
                            if (dialogModel.textureId === 0) {
                                self.quarryService.getTextures();
                            } else {
                                model.textureName = dialogModel.textureName;
                            }

                            self.dialogService.hide();
                        });
                    }
                });
        }
    }
}