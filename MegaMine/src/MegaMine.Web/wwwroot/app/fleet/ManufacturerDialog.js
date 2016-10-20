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
        let ManufacturerDialog = class ManufacturerDialog {
            constructor(fleetService, dialogService, navigation, utility) {
                this.fleetService = fleetService;
                this.dialogService = dialogService;
                this.navigation = navigation;
                this.utility = utility;
            }
            viewDialog(model, dialogMode, ev) {
                const self = this;
                self.dialogService.show({
                    templateUrl: self.utility.virtualDirectory + '/app/fleet/manufacturerDialog.html',
                    targetEvent: ev,
                    data: { model: model },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    if (dialogMode === 2 /* delete */) {
                        self.fleetService.deleteManufacturer(dialogModel.vehicleManufacturerId).then(function () {
                            self.dialogService.hide();
                            self.navigation.go("manufacturerlist");
                        });
                    }
                    else {
                        self.fleetService.saveManufacturer(dialogModel).then(function () {
                            if (model.vehicleManufacturerId === 0) {
                                self.fleetService.getManufacturerList();
                            }
                            else {
                                model.name = dialogModel.name;
                                model.description = dialogModel.description;
                            }
                        });
                        self.dialogService.hide();
                    }
                });
            }
        };
        ManufacturerDialog = __decorate([
            MegaMine.service("megamine", "MegaMine.Fleet.ManufacturerDialog"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Navigation", "MegaMine.Shared.Utility")
        ], ManufacturerDialog);
        Fleet.ManufacturerDialog = ManufacturerDialog;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=ManufacturerDialog.js.map