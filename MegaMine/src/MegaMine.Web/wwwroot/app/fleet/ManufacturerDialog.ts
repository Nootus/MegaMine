module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.Manufacturer")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Utility")
    export class ManufacturerDialog {

        constructor(private fleetService: FleetService,
            private dialogService: Shared.Dialog.DialogService<Models.IVehicleManufacturerModel>,
            private utility: MegaMine.Shared.Utility) {
        }

        public viewDialog(model: Models.IVehicleManufacturerModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: ManufacturerDialog): void {
            const self: ManufacturerDialog = context;
            self.dialogService.show({
                templateUrl: self.utility.virtualDirectory + '/app/fleet/manufacturerDialog.html',
                targetEvent: ev,
                data: { model: model },
                dialogMode: dialogMode
            })
                .then(function (dialogModel) {
                    self.fleetService.saveManufacturer(dialogModel).then(function () {
                        if (model.vehicleManufacturerId === 0) {
                            self.fleetService.getManufacturerList();
                        }
                        else {
                            model.name = dialogModel.name
                            model.description = dialogModel.description
                        }
                    });
                    self.dialogService.hide();
                });
        }
    }
}
