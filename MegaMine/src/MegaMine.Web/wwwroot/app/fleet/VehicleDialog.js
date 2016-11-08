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
        let VehicleDialog = class VehicleDialog {
            constructor(fleetService, fleetUtility, dialogService, navigation, utility) {
                this.fleetService = fleetService;
                this.fleetUtility = fleetUtility;
                this.dialogService = dialogService;
                this.navigation = navigation;
                this.utility = utility;
                this.dialogInit = (dialogController, dialogModel) => {
                    const self = this;
                    self.fleetUtility.watchManufacturerModel(dialogController.$scope, dialogModel);
                };
            }
            viewDialog(model, dialogMode, ev) {
                const self = this;
                self.dialogService.show({
                    templateUrl: self.utility.virtualDirectory + "/app/fleet/vehicleDialog.html",
                    targetEvent: ev,
                    data: { model: self.fleetService.currentVehicle },
                    dialogMode: dialogMode,
                    dialogInit: self.dialogInit,
                    resolve: {
                        resolvemodel: function () {
                            return self.fleetService.getCurrentVehicle(model.vehicleId);
                        }
                    }
                })
                    .then(function (dialogModel) {
                    self.fleetService.saveVehicle(dialogModel).then(function () {
                        if (model.vehicleId === 0) {
                            self.fleetService.getVehicleList();
                        }
                        else {
                            model.vehicleType = self.utility.getListItem(dialogModel.vehicleTypeList, dialogModel.vehicleTypeId);
                            model.manufacturer = self.utility.getListItem(dialogModel.manufacturerList, dialogModel.vehicleManufacturerId);
                            model.vehicleModel = self.utility.getListItem(dialogModel.modelList, dialogModel.vehicleModelId);
                            model.registrationNumber = dialogModel.registrationNumber;
                            model.vehicleTypeId = dialogModel.vehicleTypeId;
                            model.vehicleManufacturerId = dialogModel.vehicleManufacturerId;
                            model.vehicleModelId = dialogModel.vehicleModelId;
                        }
                        self.dialogService.hide();
                    });
                });
            }
        };
        VehicleDialog = __decorate([
            MegaMine.service("megamine", "MegaMine.Fleet.VehicleDialog"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Fleet.FleetUtility", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Navigation", "MegaMine.Shared.Utility")
        ], VehicleDialog);
        Fleet.VehicleDialog = VehicleDialog;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=VehicleDialog.js.map