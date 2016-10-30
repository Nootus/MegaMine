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
        let VehicleServiceRecord = class VehicleServiceRecord {
            constructor(fleetService, dialogService, constants) {
                this.fleetService = fleetService;
                this.dialogService = dialogService;
                this.constants = constants;
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: 'serviceDate', field: 'serviceDate', displayName: 'Service Date', type: 'date', cellFilter: 'date:"' + self.constants.dateFormat + '"' },
                        { name: 'compliant', field: 'compliant', displayName: 'Compliant', type: 'string' },
                        { name: 'totalServiceCost', field: 'totalServiceCost', displayName: 'Service Cost', type: 'number' }
                    ]
                };
                self.grid = {
                    options: gridOptions,
                    data: fleetService.vehicle.serviceRecord,
                    context: self,
                    view: self.addService,
                    primaryField: "VehicleServiceId",
                    editClaim: "Fleet:VehicleServiceEdit",
                    deleteClaim: undefined,
                    hideGridButtons: undefined
                };
            }
            addService(ev) {
                const self = this;
                let model = { vehicleServiceId: 0, vehicleId: self.fleetService.vehicle.vehicleId };
                self.viewDialog(model, self.constants.enum.dialogMode.save, ev);
            }
            viewDialog(model, dialogMode, ev) {
                const self = this;
                self.dialogService.show({
                    templateUrl: 'service_record_dialog',
                    targetEvent: ev,
                    data: { model: model },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    self.fleetService.saveVehicleService(dialogModel).then(function () {
                        self.dialogService.hide();
                    });
                });
            }
        };
        VehicleServiceRecord = __decorate([
            MegaMine.controller("megamine", "MegaMine.Fleet.VehicleServiceRecord"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Constants")
        ], VehicleServiceRecord);
        Fleet.VehicleServiceRecord = VehicleServiceRecord;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=VehicleServiceRecord.js.map