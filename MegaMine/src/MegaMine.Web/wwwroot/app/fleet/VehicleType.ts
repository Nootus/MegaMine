module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.VehicleType")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService")
    export class VehicleType {

        public dashboard: Widget.Models.IDashboardModel<VehicleType, Models.IVehicleTypeModel>;

        constructor(private fleetService: FleetService,
            private dialogService: Shared.Dialog.DialogService<Models.IVehicleTypeModel>) {
            const self: VehicleType = this;
            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: 'vehicleTypeName', field: 'vehicleTypeName', displayName: 'Vehicle Type', type: 'string' },
                    { name: 'vehicleTypeDescription', field: 'vehicleTypeDescription', type: 'string', displayName: 'Description' },
                ]
            };

            self.dashboard = {
                header: "Vehicle Types",
                context: self,
                widgets: {
                    allWidgets: fleetService.vehicleTypes.widgets.allWidgets,
                    pageWidgets: fleetService.vehicleTypes.widgets.pageWidgets
                },
                records: {
                    options: {
                        primaryField: "vehicleTypeId",
                        data: fleetService.vehicleTypes.list,
                        view: self.viewDialog
                    },
                    list: {
                        options: {
                            fields: ["vehicleTypeName", "vehicleTypeDescription"]
                        }
                    },
                    grid: {
                        options: gridOptions
                    },
                    buttons: {
                        add: {
                            text: "New",
                            toolTip: "New Vehicle Type",
                            claim: "Fleet:VehicleTypeEdit",
                            save: self.addVehicleType
                        },
                        edit: {
                            claim: "Fleet:VehicleTypeEdit"
                        },
                        delete: {
                            claim: "Fleet:VehicleTypeDelete"
                        }
                    }
                }
            };

        }

        public addVehicleType(ev: ng.IAngularEvent, context: VehicleType): void {
            const self: VehicleType = context;
            let model: Models.IVehicleTypeModel = <Models.IVehicleTypeModel>{ vehicleTypeId: 0 }
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, context);
        }

        public viewDialog(model: Models.IVehicleTypeModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: VehicleType): void {
            const self: VehicleType = context;
            self.dialogService.show({
                templateUrl: 'vehicle_type_dialog',
                targetEvent: ev,
                data: { model: model },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: Models.IVehicleTypeModel): void {
                    if (dialogMode === Shared.Dialog.Models.DialogMode.delete) {
                        self.fleetService.deleteVehicleType(dialogModel.vehicleTypeId).then(function (): void {
                            self.fleetService.getVehicleTypes();
                            self.dialogService.hide();
                        });
                    } else {
                        self.fleetService.saveVehicleType(dialogModel).then(function (): void {
                            //update the grid values
                            if (dialogModel.vehicleTypeId === 0) {
                                self.fleetService.getVehicleTypes();
                            }
                            else {
                                model.vehicleTypeName = dialogModel.vehicleTypeName
                                model.vehicleTypeDescription = dialogModel.vehicleTypeDescription
                            }

                            self.dialogService.hide();
                        });
                    }
                });
        }
    }
}
