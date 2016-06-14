module MegaMine.Quarry {
    "use strict";

    @controller("megamine", "MegaMine.Quarry.Quarry")
    @inject("quarryService", "utility", "constants", "dialogService", "template")
    class Quarry {

        private gridOptions: uiGrid.IGridOptions;
        private dashboard: any;

        constructor(private quarryService, private utility, private constants, private dialogService, private template) {
            let self = this;

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


        private addQuarry(ev, context): void  {
            let self = context;

            var model = { quarryId: 0, colourIds: [] }
            self.viewDialog(model, self.constants.enum.dialogMode.save, ev, context);
        }

        public viewDialog(model, dialogMode, ev, context): void {
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
                            //update the grid values
                            if (dialogModel.quarryId === 0) {
                                self.quarryService.getQuarries();
                            }
                            else {
                                model.quarryName = dialogModel.quarryName
                                model.location = dialogModel.location
                                angular.extend(model.colourIds, dialogModel.colourIds)
                                model.colours = self.utility.getListItem(self.quarryService.colourListItems, dialogModel.colourIds[0]);
                            }

                            self.dialogService.hide();
                        });
                    }
                });
        }
    }
}
