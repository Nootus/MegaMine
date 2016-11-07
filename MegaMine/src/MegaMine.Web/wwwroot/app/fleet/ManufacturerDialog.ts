module MegaMine.Fleet {

    @service("megamine", "MegaMine.Fleet.ManufacturerDialog")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Navigation", "MegaMine.Shared.Utility")
    export class ManufacturerDialog {

        constructor(private fleetService: FleetService,
            private dialogService: Shared.Dialog.DialogService<Models.IVehicleManufacturerModel>,
            private navigation: MegaMine.Shared.Navigation, private utility: MegaMine.Shared.Utility) {
        }

        public viewDialog(model: Models.IVehicleManufacturerModel,
            dialogMode: Shared.Dialog.Models.DialogMode, ev: ng.IAngularEvent): void {
            const self: ManufacturerDialog = this;
            self.dialogService.show({
                templateUrl: self.utility.virtualDirectory + "/app/fleet/manufacturerDialog.html",
                targetEvent: ev,
                data: { model: model },
                dialogMode: dialogMode
            })
            .then(function (dialogModel: Models.IVehicleManufacturerModel): void {
            if (dialogMode === Shared.Dialog.Models.DialogMode.delete) {
                self.fleetService.deleteManufacturer(dialogModel.vehicleManufacturerId).then(function (): void {
                    self.dialogService.hide();
                    self.navigation.go("manufacturerlist");
                });
            } else {
                self.fleetService.saveManufacturer(dialogModel).then(function (): void {
                    if (model.vehicleManufacturerId === 0) {
                        self.fleetService.getManufacturerList();
                    } else {
                        model.name = dialogModel.name;
                        model.description = dialogModel.description;
                    }
                });
                self.dialogService.hide();
            }
            });
        }
    }
}
