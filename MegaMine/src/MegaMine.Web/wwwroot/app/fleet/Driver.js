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
        let Driver = class Driver {
            constructor(fleetService, dialogService) {
                this.fleetService = fleetService;
                this.dialogService = dialogService;
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: "driverName", field: "driverName", displayName: "Name", type: "string" },
                        { name: "contact", field: "contact", displayName: "Contact", type: "string" },
                    ]
                };
                self.dashboard = {
                    header: "Drivers",
                    context: self,
                    widgets: {
                        allWidgets: fleetService.drivers.widgets.allWidgets,
                        pageWidgets: fleetService.drivers.widgets.pageWidgets
                    },
                    records: {
                        options: {
                            primaryField: "vehicleDriverId",
                            data: fleetService.drivers.list,
                            view: self.viewDialog
                        },
                        list: {
                            options: {
                                fields: ["driverName", "contact"]
                            }
                        },
                        grid: {
                            options: gridOptions
                        },
                        buttons: {
                            add: {
                                text: "New",
                                toolTip: "New Driver",
                                claim: "Fleet:DriverAdd",
                                save: self.addDriver
                            },
                            edit: {
                                claim: "Fleet:DriverEdit"
                            },
                            delete: {
                                claim: "Fleet:DriverDelete"
                            }
                        }
                    }
                };
            }
            addDriver(ev, context) {
                const self = context;
                let model = { vehicleDriverId: 0 };
                self.viewDialog(model, 1 /* save */, ev, context);
            }
            viewDialog(model, dialogMode, ev, context) {
                const self = context;
                self.dialogService.show({
                    templateUrl: 'driver_dialog',
                    targetEvent: ev,
                    data: { model: model },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    if (dialogMode === 2 /* delete */) {
                        self.fleetService.deleteDriver(dialogModel.vehicleDriverId).then(function () {
                            self.fleetService.getDrivers();
                            self.dialogService.hide();
                        });
                    }
                    else {
                        self.fleetService.saveDriver(dialogModel).then(function () {
                            // update the grid values
                            if (dialogModel.vehicleDriverId === 0) {
                                self.fleetService.getDrivers();
                            }
                            else {
                                model.driverName = dialogModel.driverName;
                                model.contact = dialogModel.contact;
                            }
                            self.dialogService.hide();
                        });
                    }
                    ;
                });
            }
        };
        Driver = __decorate([
            MegaMine.controller("megamine", "MegaMine.Fleet.Driver"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService")
        ], Driver);
        Fleet.Driver = Driver;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Driver.js.map