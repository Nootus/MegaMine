module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.VehicleTrip")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Constants", "MegaMine.Shared.Messages")
    export class VehicleTrip {

        public grid: MegaMine.Shared.DataRecord.IDataRecordGrid<VehicleTrip, Models.IVehicleTripModel>;

        constructor(private fleetService: FleetService, private dialogService: Shared.Dialog.DialogService<Models.IVehicleTripModel>,
            private constants: Shared.Constants, private messages: Shared.Messages) {

            const self: VehicleTrip = this;

            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "vehicleTripName", field: "vehicleTripName", displayName: "TripName", type: "string" },
                    {
                        name: "startingTime", field: "startingTime", displayName: "Start", type: "date",
                        cellFilter: "date:\"" + constants.dateFormat + "\""
                    },
                    {
                        name: "reachingTime", field: "reachingTime", displayName: "End", type: "date",
                        cellFilter: "date:\"" + constants.dateFormat + "\""
                    },
                    { name: "odometerStart", field: "odometerStart", displayName: "Odometer Start", type: "number" },
                    { name: "odometerEnd", field: "odometerEnd", displayName: "Odometer End", type: "number" }
                ]
            };

            self.grid = {
                options: gridOptions,
                data: fleetService.tripsList,
                context: self,
                view: self.viewDialog,
                primaryField: "vehicleTripId",
                editClaim: "Fleet:VehicleTripEdit",
                deleteClaim: undefined,
                hideGridButtons: undefined
            };
        }

        public addTrip(ev: ng.IAngularEvent): void {
            const self: VehicleTrip = this;
            var model: Models.IVehicleTripModel =
                <Models.IVehicleTripModel>{ vehicleTripId: 0, vehicleId: self.fleetService.vehicle.vehicleId };
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, self);
        }

        public validateDates(form: Models.IVehicleTripFormController): void {
            if (form !== undefined) {
                if (form.startingTime.$modelValue > form.reachingTime.$modelValue) {
                    form.reachingTime.$setValidity("invalidEndDate", false);
                } else {
                    form.reachingTime.$setValidity("invalidEndDate", true);
                }
            }
        }

        public validateOdometer(form: Models.IVehicleTripFormController): void {
            if (form !== undefined) {
                if (form.odometerStart.$modelValue > form.odometerEnd.$modelValue) {
                    form.odometerEnd.$setValidity("invalidEndOdometer", false);
                } else {
                    form.odometerEnd.$setValidity("invalidEndOdometer", true);
                }
            }
        }

        public viewDialog(model: Models.IVehicleTripModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: VehicleTrip): void {
            const self: VehicleTrip = context;

            let validators: Shared.Models.IDataValidator[] = [{
                errorMessages: [{ type: "invalidEndDate", text: self.messages.invalidEndDate }],
                validate: self.validateDates
                },
                {
                    errorMessages: [{ type: "invalidEndOdometer", text: self.messages.invalidEndOdometer }],
                    validate: self.validateOdometer
                }];

            self.dialogService.show({
                templateUrl: "vehicle_trip_dialog",
                targetEvent: ev,
                data: { model: model, validators: validators },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: Models.IVehicleTripModel): void {
                    self.fleetService.saveTrip(dialogModel).then(function (): void {
                        // update the grid values
                        if (dialogModel.vehicleTripId === 0) {
                            self.fleetService.getTripList(dialogModel.vehicleId);
                        } else {
                            model.vehicleTripName = dialogModel.vehicleTripName;
                            model.startingTime = dialogModel.startingTime;
                            model.reachingTime = dialogModel.reachingTime;
                            model.odometerStart = dialogModel.odometerStart;
                            model.odometerEnd = dialogModel.odometerEnd;
                        }

                        self.dialogService.hide();
                    });
                });
        }
    }
}
