var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Fleet;
    (function (Fleet) {
        let VehicleDriver = class VehicleDriver {
            constructor(fleetService, dialogService, utility, constants, messages) {
                this.fleetService = fleetService;
                this.dialogService = dialogService;
                this.utility = utility;
                this.constants = constants;
                this.messages = messages;
                this.assignmentMode = undefined;
                this.assignmentEnum = Fleet.Models.VehicleDriverAssignmentMode;
                const self = this;
                const gridOptions = {
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
                    Fleet.Models.VehicleDriverAssignmentMode.assign : Fleet.Models.VehicleDriverAssignmentMode.unassign;
            }
            unAssignDriver(ev) {
                const self = this;
                // getting the model for unassign
                let model;
                if (self.fleetService.vehicle.vehicleDriverAssignmentId !== null) {
                    for (let counter = 0; counter < self.fleetService.vehicleDriverList.length; counter++) {
                        if (self.fleetService.vehicleDriverList[counter].vehicleDriverAssignmentId ===
                            self.fleetService.vehicle.vehicleDriverAssignmentId) {
                            model = self.fleetService.vehicleDriverList[counter];
                            break;
                        }
                    }
                }
                else {
                    for (let counter = 0; counter < self.fleetService.vehicleDriverList.length; counter++) {
                        if (self.fleetService.vehicleDriverList[counter].assignmentEndDate === null) {
                            model = self.fleetService.vehicleDriverList[counter];
                            break;
                        }
                    }
                }
                self.viewDialog(model, 1 /* save */, ev, "Unassign", Fleet.Models.VehicleDriverAssignmentMode.unassign);
            }
            assignDriver(ev) {
                const self = this;
                let model = { vehicleDriverAssignmentId: 0, vehicleId: self.fleetService.vehicle.vehicleId };
                self.viewDialog(model, 1 /* save */, ev, "Assign", Fleet.Models.VehicleDriverAssignmentMode.assign);
            }
            addDriver(ev) {
                const self = this;
                let model = { vehicleDriverAssignmentId: 0, vehicleId: self.fleetService.vehicle.vehicleId };
                self.viewDialog(model, 1 /* save */, ev, "Save", Fleet.Models.VehicleDriverAssignmentMode.none);
            }
            validateDates(form) {
                if (form !== undefined && form.assignmentStartDate !== undefined) {
                    if (form.assignmentStartDate.$modelValue > form.assignmentEndDate.$modelValue) {
                        form.assignmentEndDate.$setValidity("invalidEndDate", false);
                    }
                    else {
                        form.assignmentEndDate.$setValidity("invalidEndDate", true);
                    }
                }
            }
            viewEditDeleteDialog(model, dialogMode, ev, context) {
                context.viewDialog(model, dialogMode, ev, undefined, undefined);
            }
            viewDialog(model, dialogMode, ev, saveText, assignmentMode) {
                const self = this;
                saveText = saveText === undefined ? "Save" : saveText;
                assignmentMode = assignmentMode === undefined ? Fleet.Models.VehicleDriverAssignmentMode.none : assignmentMode;
                let validator = {
                    errorMessages: [{ type: "invalidEndDate", text: self.messages.invalidEndTime }],
                    validate: self.validateDates
                };
                self.dialogService.show({
                    templateUrl: "vehicle_driver_dialog",
                    targetEvent: ev,
                    data: {
                        service: self.fleetService, model: model, validator: validator,
                        dataOptions: { saveText: saveText, assignmentMode: assignmentMode, assignmentEnum: Fleet.Models.VehicleDriverAssignmentMode }
                    },
                    dialogMode: dialogMode,
                    resolve: {
                        resolvemodel: function () {
                            return self.fleetService.getDriversListItems();
                        }
                    }
                })
                    .then(function (dialogModel) {
                    self.fleetService.saveVehiceDriver(dialogModel).then(function () {
                        let driverName = self.utility.getListItem(self.fleetService.driverListItems, dialogModel.vehicleDriverId);
                        if (assignmentMode === Fleet.Models.VehicleDriverAssignmentMode.assign) {
                            self.fleetService.vehicle.driver = driverName;
                            self.assignmentMode = Fleet.Models.VehicleDriverAssignmentMode.unassign;
                        }
                        else if (assignmentMode === Fleet.Models.VehicleDriverAssignmentMode.unassign ||
                            self.fleetService.vehicle.vehicleDriverAssignmentId === dialogModel.vehicleDriverAssignmentId) {
                            self.fleetService.vehicle.driver = undefined;
                            self.fleetService.vehicle.vehicleDriverAssignmentId = undefined;
                            self.assignmentMode = Fleet.Models.VehicleDriverAssignmentMode.assign;
                        }
                        // update the grid values
                        if (dialogModel.vehicleDriverAssignmentId === 0) {
                            self.fleetService.getVehicleDriverList(dialogModel.vehicleId);
                        }
                        else {
                            model.driverName = driverName;
                            model.vehicleDriverId = dialogModel.vehicleDriverId;
                            model.assignmentStartDate = dialogModel.assignmentStartDate;
                            model.assignmentEndDate = dialogModel.assignmentEndDate;
                        }
                        self.dialogService.hide();
                    });
                });
            }
        };
        VehicleDriver = __decorate([
            MegaMine.controller("megamine", "MegaMine.Fleet.VehicleDriver"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Utility", "MegaMine.Shared.Constants", "MegaMine.Shared.Messages")
        ], VehicleDriver);
        Fleet.VehicleDriver = VehicleDriver;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=VehicleDriver.js.map