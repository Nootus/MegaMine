module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.VehicleList")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Navigation")
    export class VehicleList {

        public dashboard: Widget.Models.IDashboardModel<VehicleList, Models.IVehicleListModel>;

        constructor(private fleetService: FleetService,
            private dialogService: Shared.Dialog.DialogService<Models.IVehicleListModel>,
            private navigation: Shared.Navigation) {
            const self: VehicleList = this;
            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "registrationNumber", field: "registrationNumber", displayName: "Registration #", type: "string" },
                    { name: "vehicleType", field: "vehicleType", displayName: "Type", type: "string" },
                    { name: "vehicleModel", field: "vehicleModel", displayName: "Model", type: "string" },
                    { name: "lastServiceDate", field: "lastServiceDate", displayName: "Service Date", type: "date", cellFilter: "date:"" + constants.dateFormat + """ },
                    { name: "fuelAverage", field: "fuelAverage", displayName: "Fuel Average", type: "number" },
                    { name: "driver", field: "driver", displayName: "Driver", type: "string" }
                ]
            };

            self.dashboard = {
                header: "Vehicles",
                context: self,
                widgets: {
                    allWidgets: fleetService.vehicleList.widgets.allWidgets,
                    pageWidgets: fleetService.vehicleList.widgets.pageWidgets
                },
                records: {
                    options: {
                        primaryField: "vehicleId",
                        data: fleetService.vehicleList.list,
                        view: self.viewVehicle
                    },
                    list: {
                        options: {
                            fields: ["registrationNumber", "vehicleType", "vehicleModel"]
                        }
                    },
                    grid: {
                        options: gridOptions
                    },
                    buttons: {
                        add: {
                            text: "New",
                            toolTip: "New Vehicle",
                            claim: "Fleet:VehicleAdd",
                            save: self.addVehicle
                        }
                    }
                }
            };
        }

        public viewVehicle(model: Models.IVehicleListModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: VehicleList): void {
            context.navigation.gotoVehicle(model.vehicleId);
        }

        public addVehicle(ev: ng.IAngularEvent, context: VehicleList): void {
            const self: VehicleList = context;
            let model: Models.IVehicleListModel = <Models.IVehicleListModel>{ vehicleId: 0 };
            // manufacturerDialog.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev);
        }
    }
}
