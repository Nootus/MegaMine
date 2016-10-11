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
        let VehicleType = class VehicleType {
            constructor(fleetService, dialogService) {
                this.fleetService = fleetService;
                this.dialogService = dialogService;
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: "vehicleTypeName", field: "vehicleTypeName", displayName: "Vehicle Type", type: "string" },
                        { name: "vehicleTypeDescription", field: "vehicleTypeDescription", type: "string", displayName: "Description" }
                    ]
                };
                self.dashboard = {
                    header: "Vehicle Types",
                    context: self,
                    widgets: {
                        allWidgets: fleetService.vehicleTypes.widgets.allWidgets,
                        pageWidgets: fleetService.vehicleTypes.widgets.pageWidgets
                    },
                    records: {
                        options: {
                            primaryField: "vehicleTypeId",
                            data: fleetService.vehicleTypes.list,
                            view: self.viewDialog
                        },
                        list: {
                            options: {
                                fields: ["vehicleTypeName", "vehicleTypeDescription"]
                            }
                        },
                        grid: {
                            options: gridOptions
                        },
                        buttons: {
                            add: {
                                text: "New",
                                toolTip: "New Vehicle Type",
                                claim: "Fleet:VehicleTypeAdd",
                                save: self.addVehicleType
                            },
                            edit: {
                                claim: "Fleet:VehicleTypeEdit"
                            },
                            delete: {
                                claim: "Fleet:VehicleTypeDelete"
                            }
                        }
                    }
                };
            }
            addVehicleType(ev, context) {
                const self = context;
                let model = { vehicleTypeId: 0 };
                self.viewDialog(model, 1 /* save */, ev, context);
            }
            viewDialog(model, dialogMode, ev, context) {
                const self = context;
                self.dialogService.show({
                    templateUrl: "vehicle_type_dialog",
                    targetEvent: ev,
                    data: { model: model },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    if (dialogMode === 2 /* delete */) {
                        self.fleetService.deleteVehicleType(dialogModel.vehicleTypeId).then(function () {
                            self.fleetService.getVehicleTypes();
                            self.dialogService.hide();
                        });
                    }
                    else {
                        self.fleetService.saveVehicleType(dialogModel).then(function () {
                            // update the grid values
                            if (dialogModel.vehicleTypeId === 0) {
                                self.fleetService.getVehicleTypes();
                            }
                            else {
                                model.vehicleTypeName = dialogModel.vehicleTypeName;
                                model.vehicleTypeDescription = dialogModel.vehicleTypeDescription;
                            }
                            self.dialogService.hide();
                        });
                    }
                });
            }
        };
        VehicleType = __decorate([
            MegaMine.controller("megamine", "MegaMine.Fleet.VehicleType"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService")
        ], VehicleType);
        Fleet.VehicleType = VehicleType;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=VehicleType.js.map