﻿module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.Manufacturer")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Shared.Dialog.DialogService")
    export class Manufacturer {

        public dashboard: Widget.Models.IDashboardModel<Manufacturer, Models.IVehicleManufacturerModelModel>;
        public model: Models.IManufacturerDetailsModel

        constructor(private fleetService: FleetService,
            private dialogService: Shared.Dialog.DialogService<Models.IVehicleManufacturerModel>) {
            const self: Manufacturer = this;
            const gridOptions: uiGrid.IGridOptions = {
                columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Name', type: 'string' },
                    { name: 'description', field: 'description', displayName: 'Description', type: 'string' }
                ]
            };

            self.model = fleetService.manufacturer;
            self.dashboard = {
                header: self.model.name,
                context: self,
                widgets: {
                    allWidgets: fleetService.modelsList.widgets.allWidgets,
                    pageWidgets: fleetService.modelsList.widgets.pageWidgets
                },
                records: {
                    options: {
                        primaryField: "vehicleManufacturerId",
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

        public addModel(ev: ng.IAngularEvent, context: Manufacturer): void {
            const self: Manufacturer = context;
            let model: Models.IVehicleManufacturerModelModel = <Models.IVehicleManufacturerModelModel>
                { vehicleModelId: 0, vehicleManufacturerId: self.model.vehicleManufacturerId };
            self.viewDialog(model, Shared.Dialog.Models.DialogMode.save, ev, context);
        }

        public viewDialog(model: Models.IVehicleManufacturerModelModel, dialogMode: Shared.Dialog.Models.DialogMode,
            ev: ng.IAngularEvent, context: Manufacturer): void {
            const self: Manufacturer = context;
            self.dialogService.show({
                templateUrl: 'vehicle_model_dialog',
                targetEvent: ev,
                data: { model: model },
                dialogMode: dialogMode
            })
                .then(function (dialogModel: Models.IVehicleManufacturerModelModel): void {
                    self.fleetService.saveModel(dialogModel).then(function (): void {
                        //update the grid values
                        if (dialogModel.vehicleModelId === 0) {
                            self.fleetService.getManufacturer(dialogModel.vehicleManufacturerId);
                        }
                        else {
                            model.name = dialogModel.name
                            model.description = dialogModel.description
                        }

                        self.dialogService.hide();
                    });
                });
        }
    }
}