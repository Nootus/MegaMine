module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.VehicleDriver")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService",
            "MegaMine.Shared.Utility", "MegaMine.Shared.Constants", "MegaMine.Shared.Messages")
    export class VehicleDriver {

        public grid: Widget.Models.IDashboardRecordGrid<VehicleDriver, Models.IVehicleDriverAssignmentModel>;
        public assignmentMode: Models.VehicleDriverAssignmentMode = undefined;
        public assignmentEnum: typeof Models.VehicleDriverAssignmentMode = Models.VehicleDriverAssignmentMode;

        constructor(private fleetService: FleetService,
                private dialogService: Shared.Dialog.DialogService<Models.IVehicleDriverAssignmentModel>,
                private utility: Shared.Utility, private constants: Shared.Constants, private messages: Shared.Messages) {
            const self: VehicleDriver = this;
            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: "driverName", field: "driverName", displayName: "Driver", type: "string" },
                    {
                        name: "assignmentStartDate", field: "assignmentStartDate", displayName: "Start Time", type: "date",
                        cellFilter: "date:\"" + constants.dateTimeFormat + "\""
                    },
                    {
                        name: "assignmentEndDate", field: "assignmentEndDate", displayName: "End Time", type: "date",
                        cellFilter: "date:\"" + constants.dateTimeFormat + "\""
                    }
                ]
            };

            self.grid = {
                options: gridOptions,
                data: fleetService.vehicleDriverList,
                context: self,
                view: self.viewEditDeleteDialog,
                primaryField: "vehicleDriverAssignmentId",
                editClaim: "Fleet:VehicleDriverEdit",
                deleteClaim: undefined,
                hideGridButtons: undefined
            };

            self.assignmentMode = self.fleetService.vehicle.driver === null ?
                        Models.VehicleDriverAssignmentMode.assign : Models.VehicleDriverAssignmentMode.unassign;
        }


        public unAssignDriver(ev: ng.IAngularEvent): void {
            const self: VehicleDriver = this;
            // getting the model for unassign
            let model: Models.IVehicleDriverAssignmentModel;
            if (self.fleetService.vehicle.vehicleDriverAssignmentId !== null) {
                for (let counter: number = 0; counter < self.fleetService.vehicleDriverList.length; counter++) {
                    if (self.fleetService.vehicleDriverList[counter].vehicleDriverAssignmentId ===
                            self.fleetService.vehicle.vehicleDriverAssignmentId) {
                        model = self.fleetService.vehicleDriverList[counter];
                        break;
                    }
                }
            } else {
                for (let counter: number = 0; counter < self.fleetService.vehicleDriverList.length; counter++) {
                    if (self.fleetService.vehicleDriverList[counter].assignmentEndDate === null) {
                        model = self.fleetService.vehicleDriverList[counter];
                        break;
                    }
                }
            }
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, "Unassign", Models.VehicleDriverAssignmentMode.unassign);
        }

        public assignDriver(ev: ng.IAngularEvent): void {
            const self: VehicleDriver = this;
            let model: Models.IVehicleDriverAssignmentModel =
                <Models.IVehicleDriverAssignmentModel>{ vehicleDriverAssignmentId: 0, vehicleId: self.fleetService.vehicle.vehicleId };
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, "Assign", Models.VehicleDriverAssignmentMode.assign);
        }

        public addDriver(ev: ng.IAngularEvent): void {
            const self: VehicleDriver = this;
            let model: Models.IVehicleDriverAssignmentModel =
                <Models.IVehicleDriverAssignmentModel>{ vehicleDriverAssignmentId: 0, vehicleId: self.fleetService.vehicle.vehicleId };
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, "Save", Models.VehicleDriverAssignmentMode.none);
        }

        public validateDates(form: Models.IVehicleDriverFormController): void {
            if (form !== undefined) {
                if (form.assignmentStartDate.$modelValue > form.assignmentEndDate.$modelValue) {
                    form.assignmentEndDate.$setValidity("invalidEndDate", false);
                } else {
                    form.assignmentEndDate.$setValidity("invalidEndDate", true);
                }
            }
        }

        public viewEditDeleteDialog(model: Models.IVehicleDriverAssignmentModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: VehicleDriver): void {
            context.viewDialog(model, dialogMode, ev, undefined, undefined);
        }

        public viewDialog(model: Models.IVehicleDriverAssignmentModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, saveText: string, assignmentMode: Models.VehicleDriverAssignmentMode): void {
            const self: VehicleDriver = this;
            saveText = saveText === undefined ? "Save" : saveText;
            assignmentMode = assignmentMode === undefined ? Models.VehicleDriverAssignmentMode.none : assignmentMode;

            let validator: Shared.Models.IDataValidator = {
                errorMessages: [{ type: "invalidEndDate", text: self.messages.invalidEndTime }],
                validate: self.validateDates
            };

            self.dialogService.show({
                templateUrl: "vehicle_driver_dialog",
                targetEvent: ev,
                data: {
                    service: self.fleetService, model: model, validator: validator,
                    dataOptions: { saveText: saveText, assignmentMode: assignmentMode, assignmentEnum: Models.VehicleDriverAssignmentMode }
                },
                dialogMode: dialogMode,
                resolve: {
                    resolvemodel: function (): ng.IHttpPromise<Shared.Models.IListItem<number, string>[]> {
                        return self.fleetService.getDriversListItems();
                    }
                }
            })
                .then(function (dialogModel: Models.IVehicleDriverAssignmentModel): void {
                    self.fleetService.saveVehiceDriver(dialogModel).then(function (): void {
                        let driverName: string = self.utility.getListItem(self.fleetService.driverListItems, dialogModel.vehicleDriverId);

                        if (assignmentMode === Models.VehicleDriverAssignmentMode.assign) {
                            self.fleetService.vehicle.driver = driverName;
                            self.assignmentMode = Models.VehicleDriverAssignmentMode.unassign;
                        } else if (assignmentMode === Models.VehicleDriverAssignmentMode.unassign ||
                                self.fleetService.vehicle.vehicleDriverAssignmentId === dialogModel.vehicleDriverAssignmentId) {
                            self.fleetService.vehicle.driver = undefined;
                            self.fleetService.vehicle.vehicleDriverAssignmentId = undefined;
                            self.assignmentMode = Models.VehicleDriverAssignmentMode.assign;
                        }
                        // update the grid values
                        if (dialogModel.vehicleDriverAssignmentId === 0) {
                            self.fleetService.getVehicleDriverList(dialogModel.vehicleId);
                        } else {
                            model.driverName = driverName;
                            model.vehicleDriverId = dialogModel.vehicleDriverId;
                            model.assignmentStartDate = dialogModel.assignmentStartDate;
                            model.assignmentEndDate = dialogModel.assignmentEndDate;
                        }

                        self.dialogService.hide();
                    });
                });
        }
    }
}
