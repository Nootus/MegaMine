module MegaMine.Quarry {

    @controller("megamine", "MegaMine.Quarry.Yard")
    @inject("MegaMine.Quarry.QuarryService", "MegaMine.Shared.Utility", "MegaMine.Shared.DialogService")
    export class Yard {

        public dashboard: Widget.Models.IDashboardModel<Yard, Models.IYardModel>;

        constructor(private quarryService: QuarryService, private utility: Shared.Utility,
                                private dialogService: Shared.Dialog.DialogService<Models.IYardModel>) {
            const self: Yard = this;

            self.init();
        }

        private init(): void {
            const self: Yard = this;

            let gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "yardName", field: "yardName", displayName: "Name", type: "string" },
                    { name: "location", field: "location", type: "string", displayName: "Location" }
                ]
            };

            self.dashboard = {
                header: "Yards",
                context: self,
                widgets: {
                    allWidgets: self.quarryService.yards.widgets.allWidgets,
                    pageWidgets: self.quarryService.yards.widgets.pageWidgets
                },
                records: {
                    options: {
                        primaryField: "yardId",
                        data: self.quarryService.yards.list,
                        view: self.viewDialog
                    },
                    list: {
                        options: {
                            fields: ["yardName", "location"]
                        }
                    },
                    grid: {
                        options: gridOptions
                    },
                    buttons: {
                        options: {
                            hideGridButtons: "row.entity.quarryId !== null"
                        },
                        add: {
                            text: "New",
                            toolTip: "New Yard",
                            claim: "Quarry:YardAdd,Plant:YardAdd",
                            save: self.addYard
                        },
                        edit: {
                            claim: "Quarry:YardEdit,Plant:YardEdit"
                        },
                        delete: {
                            claim: "Quarry:YardDelete,Plant:YardDelete"
                        }
                    }
                }
            };
        }

        public addYard(ev: ng.IAngularEvent, context: Yard): void {
            const self: Yard = context;

            let model: Models.IYardModel = <Models.IYardModel>{ yardId: 0 };
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, context);
        }

        public viewDialog(model: Models.IYardModel, dialogMode: Shared.Dialog.Models.DialogMode,
                                    ev: ng.IAngularEvent, context: Yard): void {
            const self: Yard = context;

            self.dialogService.show({
                templateUrl: "yard_dialog",
                targetEvent: ev,
                data: { model: model },
                dialogMode: dialogMode
            })
            .then(function (dialogModel: Models.IYardModel): void {
                if (dialogMode === Shared.Dialog.Models.DialogMode.delete) {
                    self.quarryService.deleteYard(dialogModel.yardId).then(function (): void {
                        self.quarryService.getYards();
                        self.dialogService.hide();
                    });
                } else {
                    self.quarryService.saveYard(dialogModel).then(function (): void {
                        // update the grid values
                        if (dialogModel.yardId === 0) {
                            self.quarryService.getYards();
                        } else {
                            model.yardName = dialogModel.yardName;
                            model.location = dialogModel.location;
                        }

                        self.dialogService.hide();
                    });
                }
            });
        }

    }
}