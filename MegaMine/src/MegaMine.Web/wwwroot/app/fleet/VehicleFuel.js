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
        let VehicleFuel = class VehicleFuel {
            constructor(fleetService, dialogService, dialogUtility, constants) {
                this.fleetService = fleetService;
                this.dialogService = dialogService;
                this.dialogUtility = dialogUtility;
                this.constants = constants;
                const self = this;
                const gridOptions = {
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
            addFuel(ev) {
                const self = this;
                let model = { vehicleFuelId: 0, vehicleId: self.fleetService.vehicle.vehicleId };
                self.viewDialog(model, 1 /* save */, ev, self);
            }
            viewDialog(model, dialogMode, ev, context) {
                const self = context;
                let error = {};
                self.dialogService.show({
                    templateUrl: "vehicle_fuel_dialog",
                    targetEvent: ev,
                    data: { model: model, error: error },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    self.fleetService.saveFuel(dialogModel).then(function () {
                        // update the grid values
                        if (dialogModel.vehicleFuelId === 0) {
                            self.fleetService.getFuelList(dialogModel.vehicleId);
                        }
                        else {
                            model.odometer = dialogModel.odometer;
                            model.quantity = dialogModel.quantity;
                            model.fuelDate = dialogModel.fuelDate;
                        }
                        self.dialogService.hide();
                    }).catch(function (data) {
                        error.message = data.message;
                    });
                });
            }
            resetFuel(ev) {
                const self = this;
                self.dialogUtility.confirm("Reset Average", "Please confirm to reset fuel average", ev)
                    .then(function () {
                    self.fleetService.resetFuelAverage(self.fleetService.vehicle.vehicleId)
                        .then(function () {
                        self.fleetService.vehicle.fuelAverage = null;
                    });
                });
            }
        };
        VehicleFuel = __decorate([
            MegaMine.controller("megamine", "MegaMine.Fleet.VehicleFuel"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Dialog.DialogUtility", "MegaMine.Shared.Constants")
        ], VehicleFuel);
        Fleet.VehicleFuel = VehicleFuel;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=VehicleFuel.js.map