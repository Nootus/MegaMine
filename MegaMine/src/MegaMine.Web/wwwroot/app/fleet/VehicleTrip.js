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
        let VehicleTrip = class VehicleTrip {
            constructor(fleetService, dialogService, constants, messages) {
                this.fleetService = fleetService;
                this.dialogService = dialogService;
                this.constants = constants;
                this.messages = messages;
                const self = this;
                const gridOptions = {
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
            addTrip(ev) {
                const self = this;
                var model = { vehicleTripId: 0, vehicleId: self.fleetService.vehicle.vehicleId };
                self.viewDialog(model, 1 /* save */, ev, self);
            }
            validateDates(form) {
                if (form !== undefined) {
                    if (form.startingTime.$modelValue > form.reachingTime.$modelValue) {
                        form.reachingTime.$setValidity("invalidEndDate", false);
                    }
                    else {
                        form.reachingTime.$setValidity("invalidEndDate", true);
                    }
                }
            }
            validateOdometer(form) {
                if (form !== undefined) {
                    if (form.odometerStart.$modelValue > form.odometerEnd.$modelValue) {
                        form.odometerEnd.$setValidity("invalidEndOdometer", false);
                    }
                    else {
                        form.odometerEnd.$setValidity("invalidEndOdometer", true);
                    }
                }
            }
            viewDialog(model, dialogMode, ev, context) {
                const self = context;
                let validators = [{
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
                    .then(function (dialogModel) {
                    self.fleetService.saveTrip(dialogModel).then(function () {
                        // update the grid values
                        if (dialogModel.vehicleTripId === 0) {
                            self.fleetService.getTripList(dialogModel.vehicleId);
                        }
                        else {
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
        };
        VehicleTrip = __decorate([
            MegaMine.controller("megamine", "MegaMine.Fleet.VehicleTrip"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Constants", "MegaMine.Shared.Messages")
        ], VehicleTrip);
        Fleet.VehicleTrip = VehicleTrip;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=VehicleTrip.js.map