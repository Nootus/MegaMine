module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.ManufacturerList")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Fleet.ManufacturerDialog",
        "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Navigation")
    export class ManufacturerList {

        public dashboard: Widget.Models.IDashboardModel<ManufacturerList, Models.IVehicleManufacturerModel>;

        constructor(private fleetService: FleetService, private manufacturerDialog: MegaMine.Fleet.ManufacturerDialog,
            private dialogService: Shared.Dialog.DialogService<Models.IVehicleManufacturerModel>,
            private navigation: Shared.Navigation) {
            const self: ManufacturerList = this;
            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "name", field: "name", displayName: "Name", type: "string" },
                    { name: "description", field: "description", displayName: "Description", type: "string" }
                ]
            };

            self.dashboard = {
                header: "Manufacturers",
                context: self,
                records: {
                    options: {
                        primaryField: "vehicleManufacturerId",
                        data: fleetService.manufacturerList.list,
                        view: self.viewManufacturer
                    },
                    list: {
                        options: {
                            fields: ["name", "description"]
                        }
                    },
                    grid: {
                        options: gridOptions
                    },
                    buttons: {
                        add: {
                            text: "New",
                            toolTip: "New Manufacturer",
                            claim: "Fleet:ManufacturerAdd",
                            save: self.addManufacturer
                        },
                        edit: {
                            claim: "Fleet:ManufacturerEdit"
                        },
                        delete: {
                            claim: "Fleet:ManufacturerDelete"
                        }
                    }
                }
            };
        }

        public viewManufacturer(model: Models.IVehicleManufacturerModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: ManufacturerList): void {
            if (dialogMode === Shared.Dialog.Models.DialogMode.view) {
                context.navigation.gotoManufacturer(model.vehicleManufacturerId);
            }
            else {
                context.manufacturerDialog.viewDialog(model, dialogMode, ev);
            }
        }

        public addManufacturer(ev: ng.IAngularEvent, context: ManufacturerList): void {
            const self: ManufacturerList = context;
            let model: Models.IVehicleManufacturerModel = <Models.IVehicleManufacturerModel>{ vehicleManufacturerId: 0 };
            self.manufacturerDialog.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev);
        }
    }
}
