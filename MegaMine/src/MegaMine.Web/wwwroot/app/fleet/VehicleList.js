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
        let VehicleList = class VehicleList {
            constructor(fleetService, dialogService, navigation, constants) {
                this.fleetService = fleetService;
                this.dialogService = dialogService;
                this.navigation = navigation;
                this.constants = constants;
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: "registrationNumber", field: "registrationNumber", displayName: "Registration #", type: "string" },
                        { name: "vehicleType", field: "vehicleType", displayName: "Type", type: "string" },
                        { name: "vehicleModel", field: "vehicleModel", displayName: "Model", type: "string" },
                        {
                            name: "lastServiceDate", field: "lastServiceDate", displayName: "Service Date", type: "date",
                            cellFilter: "date:\"" + constants.dateFormat + "\""
                        },
                        { name: "fuelAverage", field: "fuelAverage", displayName: "Fuel Average", type: "number" },
                        { name: "driver", field: "driver", displayName: "Driver", type: "string" }
                    ]
                };
                self.dashboard = {
                    header: "Vehicles",
                    context: self,
                    widgets: {
                        allWidgets: fleetService.vehicleList.widgets.allWidgets,
                        pageWidgets: fleetService.vehicleList.widgets.pageWidgets
                    },
                    records: {
                        options: {
                            primaryField: "vehicleId",
                            data: fleetService.vehicleList.list,
                            view: self.viewVehicle
                        },
                        list: {
                            options: {
                                fields: ["registrationNumber", "vehicleType", "vehicleModel"]
                            }
                        },
                        grid: {
                            options: gridOptions
                        },
                        buttons: {
                            add: {
                                text: "New",
                                toolTip: "New Vehicle",
                                claim: "Fleet:VehicleAdd",
                                save: self.addVehicle
                            }
                        }
                    }
                };
            }
            viewVehicle(model, dialogMode, ev, context) {
                context.navigation.gotoVehicle(model.vehicleId);
            }
            addVehicle(ev, context) {
                const self = context;
                let model = { vehicleId: 0 };
                // manufacturerDialog.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev);
            }
        };
        VehicleList = __decorate([
            MegaMine.controller("megamine", "MegaMine.Fleet.VehicleList"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Navigation", "MegaMine.Shared.Constants")
        ], VehicleList);
        Fleet.VehicleList = VehicleList;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=VehicleList.js.map