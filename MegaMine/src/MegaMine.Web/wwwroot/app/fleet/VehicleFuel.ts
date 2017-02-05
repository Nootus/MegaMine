module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.VehicleFuel")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService",
        "MegaMine.Shared.Dialog.DialogUtility", "MegaMine.Shared.Constants")
    export class VehicleFuel {

        public grid: MegaMine.Shared.DataRecord.IDataRecordGrid<VehicleFuel, Models.IFuelModel>;

        constructor(private fleetService: FleetService, private dialogService: Shared.Dialog.DialogService<Models.IFuelModel>,
            private dialogUtility: MegaMine.Shared.Dialog.DialogUtility, private constants: Shared.Constants) {
            const self: VehicleFuel = this;
            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    {
                        name: "fuelDate", field: "fuelDate", displayName: "Fuel Date", type: "date",
                        cellFilter: "date:\"" + constants.dateFormat + "\""
                    },
                    { name: "quantity", field: "quantity", displayName: "Quantity", type: "number" },
                    { name: "odometer", field: "odometer", displayName: "Odometer", type: "number" }
                ]
            };

            self.grid = {
                options: gridOptions,
                data: fleetService.fuelList,
                context: self,
                view: self.viewDialog,
                primaryField: "vehicleFuelId",
                editClaim: "Fleet:VehicleFuelEdit",
                deleteClaim: undefined,
                hideGridButtons: undefined
            };
        }

        public addFuel(ev: ng.IAngularEvent): void {
            const self: VehicleFuel = this;
            let model: Models.IFuelModel = <Models.IFuelModel>{ vehicleFuelId: 0, vehicleId: self.fleetService.vehicle.vehicleId };
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, self);
        }

        public viewDialog(model: Models.IFuelModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: VehicleFuel): void {
            const self: VehicleFuel = context;

            let error: Shared.Models.INtException = <Shared.Models.INtException>{};
            self.dialogService.show({
                templateUrl: "vehicle_fuel_dialog",
                targetEvent: ev,
                data: { model: model, error: error },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: Models.IFuelModel): void {
                    self.fleetService.saveFuel(dialogModel).then(function (): void {
                        // update the grid values
                        if (dialogModel.vehicleFuelId === 0) {
                            self.fleetService.getFuelList(dialogModel.vehicleId);
                        } else {
                            model.odometer = dialogModel.odometer;
                            model.quantity = dialogModel.quantity;
                            model.fuelDate = dialogModel.fuelDate;
                        }

                        self.dialogService.hide();
                    }).catch(function (data: Shared.Models.INtException): void {
                        error.message = data.message;
                    });
                });
        }

        public resetFuel(ev: MouseEvent): void {
            const self: VehicleFuel = this;
            self.dialogUtility.confirm("Reset Average", "Please confirm to reset fuel average", ev)
                .then(function (): void {
                    self.fleetService.resetFuelAverage(self.fleetService.vehicle.vehicleId)
                        .then(function (): void {
                            self.fleetService.vehicle.fuelAverage = null;
                        });
                });
        }
    }
}
