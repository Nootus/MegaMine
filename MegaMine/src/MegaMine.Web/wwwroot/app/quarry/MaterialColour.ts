module MegaMine.Quarry {

    @controller("megamine", "MegaMine.Quarry.MaterialColour")
    @inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Dialog.DialogService")
    export class MaterialColour {

        public dashboard: Widget.Models.IDashboardModel<MaterialColour, Models.IMaterialColourModel>;

        constructor(private quarryService: QuarryService,
            private dialogService: Shared.Dialog.DialogService<Models.IMaterialColourModel>) {
            const self: MaterialColour = this;
            const gridOptions: uiGrid.IGridOptions = {
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



        public addMaterialColour(ev: ng.IAngularEvent, context: MaterialColour): void {
            const self: MaterialColour = context;
            let model: Models.IMaterialColourModel = <Models.IMaterialColourModel>{ materialColourId: 0 };
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, context);
        }

        public viewDialog(model: Models.IMaterialColourModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: MaterialColour): void {
            const self: MaterialColour = context;

            self.dialogService.show({
                templateUrl: "material_colour_dialog",
                targetEvent: ev,
                data: { model: model },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: Models.IMaterialColourModel): void {
                    if (dialogMode === Shared.Dialog.Models.DialogMode.delete) {
                        self.quarryService.deleteMaterialColour(dialogModel.materialColourId).then(function (): void {
                            self.quarryService.getMaterialColours();
                            self.dialogService.hide();
                        });
                    } else {
                        self.quarryService.saveMaterialColour(dialogModel).then(function (): void {
                            // update the grid values
                            if (dialogModel.materialColourId === 0) {
                                self.quarryService.getMaterialColours();
                            } else {
                                model.colourName = dialogModel.colourName;
                                model.colourDescription = dialogModel.colourDescription;
                            }

                            self.dialogService.hide();
                        });
                    }
                });
        }
    }
}
