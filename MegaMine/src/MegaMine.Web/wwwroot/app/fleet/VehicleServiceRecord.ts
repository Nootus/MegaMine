module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.VehicleServiceRecord")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Constants")
    export class VehicleServiceRecord {

        public grid: MegaMine.Shared.DataRecord.IDataRecordGrid<VehicleServiceRecord, Models.IVehicleServiceModel>;

        constructor(private fleetService: FleetService, private dialogService: Shared.Dialog.DialogService<Models.IVehicleServiceModel>,
            private constants: Shared.Constants) {

            const self: VehicleServiceRecord = this;

            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    {
                        name: "serviceDate", field: "serviceDate", displayName: "Service Date", type: "date",
                        cellFilter: "date:\"" + self.constants.dateFormat + "\""
                    },
                    { name: "compliant", field: "compliant", displayName: "Compliant", type: "string" },
                    { name: "totalServiceCost", field: "totalServiceCost", displayName: "Service Cost", type: "number" }
                ]
            };

            self.grid = {
                options: gridOptions,
                data: fleetService.vehicle.serviceRecord,
                context: self,
                view: self.viewDialog,
                primaryField: "vehicleServiceId",
                editClaim: "Fleet:VehicleServiceEdit",
                deleteClaim: undefined,
                hideGridButtons: undefined
            };
        }

        public addService(ev: ng.IAngularEvent): void {
            const self: VehicleServiceRecord = this;
            let model: Models.IVehicleServiceModel =
                <Models.IVehicleServiceModel>{ vehicleServiceId: 0, vehicleId: self.fleetService.vehicle.vehicleId };
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, self);
        }

        public viewDialog(model: Models.IVehicleServiceModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: VehicleServiceRecord): void {
            const self: VehicleServiceRecord = context;
            self.dialogService.show({
                templateUrl: "service_record_dialog",
                targetEvent: ev,
                data: { model: model },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: Models.IVehicleServiceModel): void {
                    self.fleetService.saveVehicleService(dialogModel).then(function (): void {
                        self.dialogService.hide();
                    });
                });
        }
    }
}
