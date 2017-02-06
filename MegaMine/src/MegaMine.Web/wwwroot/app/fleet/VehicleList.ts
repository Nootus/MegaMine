module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.VehicleList")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Fleet.VehicleDialog", "MegaMine.Shared.Dialog.DialogService",
        "MegaMine.Shared.Navigation", "MegaMine.Shared.Constants")
    export class VehicleList {

        public dashboard: Widget.Models.IDashboardModel<VehicleList, Models.IVehicleListModel>;

        constructor(private fleetService: FleetService, private vehicleDialog: VehicleDialog,
            private dialogService: Shared.Dialog.DialogService<Models.IVehicleListModel>,
            private navigation: Shared.Navigation, private constants: Shared.Constants) {
            const self: VehicleList = this;
            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "registrationNumber", field: "registrationNumber", displayName: "Registration #", type: "string" },
                    { name: "vehicleType", field: "vehicleType", displayName: "Type", type: "string" },
                    { name: "vehicleModel", field: "vehicleModel", displayName: "Model", type: "string" },
                    {
                        name: "lastServiceDate", field: "lastServiceDate", displayName: "Service Date", type: "date",
                        cellFilter: "date:\"" + constants.dateFormat + "\""
                    },
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
                        },
                        edit: {
                            claim: "Fleet:VehicleEdit"
                        },
                        delete: {
                            claim: "Fleet:VehicleDelete"
                        }
                    }
                }
            };
        }

        public viewVehicle(model: Models.IVehicleListModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: VehicleList): void {
            if (dialogMode === Shared.Dialog.Models.DialogMode.view) {
                context.navigation.gotoVehicle(model.vehicleId);
            }
            else {
                //context.vehicleDialog.viewDialog(model, dialogMode, ev);
            }
        }

        public addVehicle(ev: ng.IAngularEvent, context: VehicleList): void {
            const self: VehicleList = context;
            let model: Models.IVehicleDetailsModel = <Models.IVehicleDetailsModel>{ vehicleId: 0 };
            self.vehicleDialog.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev);
        }
    }
}
