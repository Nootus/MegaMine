module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.Driver")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService")
    export class Driver {

        public dashboard: Widget.Models.IDashboardModel<Driver, Models.IVehicleDriverModel>;

        constructor(private fleetService: FleetService,
            private dialogService: Shared.Dialog.DialogService<Models.IVehicleDriverModel>) {
            const self: Driver = this;
            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "driverName", field: "driverName", displayName: "Name", type: "string" },
                    { name: "contact", field: "contact", displayName: "Contact", type: "string" },
                ]
            };

            self.dashboard = {
                header: "Drivers",
                context: self,
                widgets: {
                    allWidgets: fleetService.drivers.widgets.allWidgets,
                    pageWidgets: fleetService.drivers.widgets.pageWidgets
                },
                records: {
                    options: {
                        primaryField: "vehicleDriverId",
                        data: fleetService.drivers.list,
                        view: self.viewDialog
                    },
                    list: {
                        options: {
                            fields: ["driverName", "contact"]
                        }
                    },
                    grid: {
                        options: gridOptions
                    },
                    buttons: {
                        add: {
                            text: "New",
                            toolTip: "New Driver",
                            claim: "Fleet:DriverAdd",
                            save: self.addDriver
                        },
                        edit: {
                            claim: "Fleet:DriverEdit"
                        },
                        delete: {
                            claim: "Fleet:DriverDelete"
                        }
                    }
                }
            };

        }

        public addDriver(ev: ng.IAngularEvent, context: Driver): void {
            const self: Driver = context;
            let model: Models.IVehicleDriverModel = <Models.IVehicleDriverModel>{ vehicleDriverId: 0 }
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, context);
        }

        public viewDialog(model: Models.IVehicleDriverModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: Driver): void {
            const self: Driver = context;
            self.dialogService.show({
                templateUrl: 'driver_dialog',
                targetEvent: ev,
                data: { model: model },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: Models.IVehicleDriverModel): void {
                    if (dialogMode === Shared.Dialog.Models.DialogMode.delete) {
                        self.fleetService.deleteDriver(dialogModel.vehicleDriverId).then(function (): void {
                            self.fleetService.getDrivers();
                            self.dialogService.hide();
                        });
                    } else {
                        self.fleetService.saveDriver(dialogModel).then(function () {
                            // update the grid values
                            if (dialogModel.vehicleDriverId === 0) {
                                self.fleetService.getDrivers();
                            } else {
                                model.driverName = dialogModel.driverName;
                                model.contact = dialogModel.contact;
                            }

                            self.dialogService.hide();
                        });
                    };
                });
        }
    }
}
