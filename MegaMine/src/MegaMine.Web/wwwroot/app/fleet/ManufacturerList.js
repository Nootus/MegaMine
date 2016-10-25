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
        let ManufacturerList = class ManufacturerList {
            constructor(fleetService, manufacturerDialog, dialogService, navigation) {
                this.fleetService = fleetService;
                this.manufacturerDialog = manufacturerDialog;
                this.dialogService = dialogService;
                this.navigation = navigation;
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: "name", field: "name", displayName: "Name", type: "string" },
                        { name: "description", field: "description", displayName: "Description", type: "string" }
                    ]
                };
                self.dashboard = {
                    header: "Manufacturers",
                    context: self,
                    widgets: {
                        allWidgets: fleetService.manufacturerList.widgets.allWidgets,
                        pageWidgets: fleetService.manufacturerList.widgets.pageWidgets
                    },
                    records: {
                        options: {
                            primaryField: "vehicleManufacturerId",
                            data: fleetService.manufacturerList.list,
                            view: self.viewManufacturer
                        },
                        list: {
                            options: {
                                fields: ["name", "description"]
                            }
                        },
                        grid: {
                            options: gridOptions
                        },
                        buttons: {
                            add: {
                                text: "New",
                                toolTip: "New Manufacturer",
                                claim: "Fleet:ManufacturerAdd",
                                save: self.addManufacturer
                            }
                        }
                    }
                };
            }
            viewManufacturer(model, dialogMode, ev, context) {
                context.navigation.gotoManufacturer(model.vehicleManufacturerId);
            }
            addManufacturer(ev, context) {
                const self = context;
                let model = { vehicleManufacturerId: 0 };
                self.manufacturerDialog.viewDialog(model, 1 /* save */, ev);
            }
        };
        ManufacturerList = __decorate([
            MegaMine.controller("megamine", "MegaMine.Fleet.ManufacturerList"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Fleet.ManufacturerDialog", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Navigation")
        ], ManufacturerList);
        Fleet.ManufacturerList = ManufacturerList;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=ManufacturerList.js.map