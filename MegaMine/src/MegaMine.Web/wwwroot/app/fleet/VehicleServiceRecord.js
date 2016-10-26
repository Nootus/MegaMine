//module MegaMine.Fleet {
//    @controller("megamine", "MegaMine.Fleet.VehicleServiceRecord")
//    @inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Constants")
//    export class VehicleServiceRecord {
//        public grid: Widget.Models.IDashboardRecordGrid<VehicleServiceRecord, Models.IVehicleServiceModel>;
//        constructor(private fleetService: FleetService, private dialogService: Shared.Dialog.DialogService<Models.IVehicleServiceModel>,
//            private constants: Shared.Constants) {
//            const self: VehicleServiceRecord = this;
//            const gridOptions: uiGrid.IGridOptions = {
//                columnDefs: [
//                    { name: 'serviceDate', field: 'serviceDate', displayName: 'Service Date', type: 'date', cellFilter: 'date:"' + self.constants.dateFormat + '"' },
//                    { name: 'compliant', field: 'compliant', displayName: 'Compliant', type: 'string' },
//                    { name: 'totalServiceCost', field: 'totalServiceCost', displayName: 'Service Cost', type: 'number' }
//                    //template.getButtonDefaultColumnDefs('vehicleServiceId', 'Fleet:VehicleServiceEdit')
//                ]
//            };
//            self.grid = {
//                options: gridOptions,
//                data: fleetService.vehicle.serviceRecord,
//                context: self
//            };
//            //gridUtility.initializeSubGrid(vm.gridOptions, $scope, vehicleService.vehicle.serviceRecord);
//        }
//        public addService(ev) {
//            const self: VehicleServiceRecord = this;
//            let model: Models.IVehicleServiceModel = <Models.IVehicleServiceModel>{ vehicleServiceId: 0, vehicleId: self.fleetService.vehicle.vehicleId }
//            self.viewDialog(model, self.constants.enum.dialogMode.save, ev);
//        }
//        public viewDialog(model, dialogMode, ev) {
//            const self: VehicleServiceRecord = this;
//            self.dialogService.show({
//                templateUrl: 'service_record_dialog',
//                targetEvent: ev,
//                data: { model: model },
//                dialogMode: dialogMode
//            })
//            .then(function (dialogModel: Models.IVehicleServiceModel): void {
//                self.fleetService.saveVehicleService(dialogModel).then(function () {
//                    self.dialogService.hide();
//                });
//            });
//        }
//    }
//}
//# sourceMappingURL=VehicleServiceRecord.js.map