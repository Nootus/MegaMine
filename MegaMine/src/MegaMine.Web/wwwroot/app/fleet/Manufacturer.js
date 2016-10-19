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
        let Manufacturer = class Manufacturer {
            constructor(fleetService, dialogService) {
                this.fleetService = fleetService;
                this.dialogService = dialogService;
                const self = this;
                const gridOptions = {
                    columnDefs: [
                        { name: "name", field: "name", displayName: "Name", type: "string" },
                        { name: "description", field: "description", displayName: "Description", type: "string" }
                    ]
                };
                self.model = fleetService.manufacturer;
                self.dashboard = {
                    header: "Models",
                    context: self,
                    widgets: {
                        allWidgets: fleetService.modelsList.widgets.allWidgets,
                        pageWidgets: fleetService.modelsList.widgets.pageWidgets
                    },
                    records: {
                        options: {
                            primaryField: "vehicleModelId",
                            data: fleetService.modelsList.list,
                            view: self.viewDialog
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
                                toolTip: "New Vehicle Type",
                                claim: "Fleet:ManufacturerModelAdd",
                                save: self.addModel
                            },
                            edit: {
                                claim: "Fleet:ManufacturerModelEdit"
                            },
                            delete: {
                                claim: "Fleet:ManufacturerModelDelete"
                            }
                        }
                    }
                };
            }
            //function viewManufacturer(ev) {
            //    manufacturerDialog.viewDialog(vm.model, constants.enum.dialogMode.save, ev);
            //}
            addModel(ev, context) {
                const self = context;
                let model = { vehicleModelId: 0, vehicleManufacturerId: self.model.vehicleManufacturerId };
                self.viewDialog(model, 1 /* save */, ev, context);
            }
            viewDialog(model, dialogMode, ev, context) {
                const self = context;
                self.dialogService.show({
                    templateUrl: "vehicle_model_dialog",
                    targetEvent: ev,
                    data: { model: model },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    if (dialogMode === 2 /* delete */) {
                        self.fleetService.deleteModel(dialogModel.vehicleModelId).then(function () {
                            self.fleetService.getManufacturer(dialogModel.vehicleManufacturerId);
                            self.dialogService.hide();
                        });
                    }
                    else {
                        self.fleetService.saveModel(dialogModel).then(function () {
                            // update the grid values
                            if (dialogModel.vehicleModelId === 0) {
                                self.fleetService.getManufacturer(dialogModel.vehicleManufacturerId);
                            }
                            else {
                                model.name = dialogModel.name;
                                model.description = dialogModel.description;
                            }
                            self.dialogService.hide();
                        });
                    }
                });
            }
        };
        Manufacturer = __decorate([
            MegaMine.controller("megamine", "MegaMine.Fleet.Manufacturer"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService")
        ], Manufacturer);
        Fleet.Manufacturer = Manufacturer;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Manufacturer.js.map