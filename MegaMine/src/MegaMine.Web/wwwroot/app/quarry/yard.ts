module MegaMine.Quarry {

    "use strict";
    @controller("megamine", "MegaMine.Quarry.Yard")
    @inject("quarryService", "MegaMine.Shared.Utility", "MegaMine.Shared.DialogService")
    export class Yard {

        public dashboard;

        constructor(private quarryService, private utility: Shared.Utility, private dialogService) {
            let self: Yard = this;

            self.init();
        }

        private init(): void {
            let self: Yard = this;

            let gridOptions = {
                columnDefs: [
                    { name: 'yardName', field: 'yardName', displayName: 'Name', type: 'string' },
                    { name: 'location', field: 'location', type: 'string', displayName: 'Location' }
                ]
            };

            self.dashboard = {
                header: 'Yards',
                context: self,
                widgets: {
                    allWidgets: self.quarryService.yards.widgets.allWidgets,
                    pageWidgets: self.quarryService.yards.widgets.pageWidgets,
                },
                records: {
                    options: {
                        primaryField: 'yardId',
                        data: self.quarryService.yards.list,
                        view: self.viewDialog
                    },
                    list: {
                        options: {
                            fields: ['yardName', 'location'],
                        },
                    },
                    grid: {
                        options: gridOptions,
                    },
                    buttons: {
                        options: {
                            hideGridButtons: 'row.entity.quarryId !== null'
                        },
                        add: {
                            text: 'New',
                            toolTip: 'New Yard',
                            claim: 'Quarry:YardAdd,Plant:YardAdd',
                            save: self.addYard,
                        },
                        edit: {
                            claim: 'Quarry:YardEdit,Plant:YardEdit'
                        },
                        delete: {
                            claim: 'Quarry:YardDelete,Plant:YardDelete'
                        }
                    }
                }
            }
            
        }

        public addYard(ev, context: Yard): void {
            let self: Yard = context;

            let model = { yardId: 0 }
            self.viewDialog(model, Shared.Models.DialogMode.save, ev, context);
        }

        public viewDialog(model, dialogMode, ev, context: Yard): void {
            let self: Yard = context;

            self.dialogService.show({
                templateUrl: 'yard_dialog',
                targetEvent: ev,
                data: { model: model },
                dialogMode: dialogMode
            })
            .then(function (dialogModel) {
                if (dialogMode === Shared.Models.ButtonType.delete) {
                    self.quarryService.deleteYard(dialogModel.yardId).then(function () {
                        self.quarryService.getYards();
                        self.dialogService.hide();
                    });
                }
                else {
                    self.quarryService.saveYard(dialogModel).then(function () {
                        //update the grid values
                        if (dialogModel.yardId === 0) {
                            self.quarryService.getYards();
                        }
                        else {
                            model.yardName = dialogModel.yardName
                            model.location = dialogModel.location
                        }

                        self.dialogService.hide();
                    });
                }
            });
        }

    }
}