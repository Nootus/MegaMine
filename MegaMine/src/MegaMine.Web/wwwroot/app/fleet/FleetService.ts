module MegaMine.Fleet {

    @service("megamine", "MegaMine.Fleet.FleetService")
    @inject("$http", "MegaMine.Shared.Utility")
    export class FleetService {

        constructor(private $http: ng.IHttpService, private utility: Shared.Utility) {
        }

        // master tables
        public vehicleTypes: Widget.Models.IDashboardDataModel<Models.IVehicleTypeModel> = {
            list: <Models.IVehicleTypeModel[]>[],
            widgets: <Widget.Models.IDashboardWidgets>{}
        };
        public drivers: Widget.Models.IDashboardDataModel<Models.IVehicleDriverModel> = {
            list: <Models.IVehicleDriverModel[]>[],
            widgets: <Widget.Models.IDashboardWidgets>{}
        };

        // vehicles
        public vehicleList: Widget.Models.IDashboardDataModel<Models.IVehicleListModel> = {
            list: <Models.IVehicleListModel[]>[],
            widgets: <Widget.Models.IDashboardWidgets>{}
        };

        public vehicle: Models.IVehicleDetailsModel = <Models.IVehicleDetailsModel>{};
        public currentVehicle: Models.IVehicleModel = <Models.IVehicleModel>{};
        public currentVehicleService: Models.IVehicleServiceModel = <Models.IVehicleServiceModel>{};

        // fuel
        public fuelList: Models.IFuelModel[] = [];

        // vehicle driver
        public vehicleDriverList: Models.IVehicleDriverAssignmentModel[] = [];
        public driverListItems: Shared.Models.IListItem<number, string>[] = [];

        // manufacturers data types
        public manufacturerList: Widget.Models.IDashboardDataModel<Models.IVehicleManufacturerModel> = {
            list: <Models.IVehicleManufacturerModel[]>[],
            widgets: <Widget.Models.IDashboardWidgets>{}
        };

        public manufacturer: Models.IManufacturerDetailsModel = <Models.IManufacturerDetailsModel>{};
        public currentManufacturer: Models.IVehicleManufacturerModel = <Models.IVehicleManufacturerModel>{};

        // models
        public modelsList: Widget.Models.IDashboardDataModel<Models.IVehicleManufacturerModelModel> = {
            list: <Models.IVehicleManufacturerModelModel[]>[],
            widgets: <Widget.Models.IDashboardWidgets>{}
        };

        // trips
        public tripsList: Models.IVehicleTripModel[] = [];

        public getVehicleList(): ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IVehicleListModel[]>> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/vehiclelist")
                .then(function (data: Shared.Models.IAjaxDataModel<Models.IVehicleListModel[]>):
                    Shared.Models.IAjaxDataModel<Models.IVehicleListModel[]> {
                        self.utility.extend(self.vehicleList.list, data.model);
                        angular.extend(self.vehicleList.widgets, data.dashboard);
                        return data;
                });
        }

        public getVehicle(vehicleId: number): ng.IHttpPromise<Models.IVehicleDetailsModel> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/vehicledetailsget", { params: { "vehicleId": vehicleId } })
                .then(function (data: Models.IVehicleDetailsModel): Models.IVehicleDetailsModel {
                    self.vehicle = data;
                    return data;
                });
        }

        public resetFuelAverage(vehicleId: number): ng.IHttpPromise<void> {
            const self: FleetService = this;
            return self.$http.post<void>("/api/fleet/vehiclefuelreset", vehicleId);
        }

        public getTripList(vehicleId: number): ng.IHttpPromise<Models.IVehicleTripModel[]> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/vehicletriplistget", { params: { "vehicleId": vehicleId } })
                .then(function (data: Models.IVehicleTripModel[]): Models.IVehicleTripModel[] {
                    self.utility.extend(self.tripsList, data);
                    return data;
                });
        }

        public saveTrip(model: Models.IVehicleTripModel): ng.IHttpPromise<void> {
            const self: FleetService = this;

            let url: string;
            if (model.vehicleTripId === 0) {
                url = "/api/fleet/vehicletripadd";
            } else {
                url = "/api/fleet/vehicletripupdate";
            }
            return self.$http.post<void>(url, model);
        }

        public getFuelList(vehicleId: number): ng.IHttpPromise<Models.IFuelModel[]>  {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/fuelgetlist", { params: { "vehicleId": vehicleId } })
                .then(function (data: Models.IFuelModel[]): Models.IFuelModel[] {
                    self.utility.extend(self.fuelList, data);
                    return data;
                });
        }

        public saveFuel(model: Models.IFuelModel): ng.IHttpPromise<void> {
            const self: FleetService = this;
            let url: string;
            if (model.vehicleFuelId === 0) {
                url = "/api/fleet/fueladd";
            } else {
                url = "/api/fleet/fuelupdate";
            }
            return self.$http.post<void>(url, model);
        }

        public getManufacturerList(): ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IVehicleManufacturerModel[]>> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/manufacturersget")
                .then(function (data: Shared.Models.IAjaxDataModel<Models.IVehicleManufacturerModel[]>):
                    Shared.Models.IAjaxDataModel<Models.IVehicleManufacturerModel[]> {
                    self.utility.extend(self.manufacturerList.list, data.model);
                    angular.extend(self.manufacturerList.widgets, data.dashboard);
                    return data;
                });
        }

        public getManufacturer(manufacturerId: number): ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IManufacturerDetailsModel>> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/manufacturerdetailsget", { params: { "manufacturerId": manufacturerId } })
                .then(function (data: Shared.Models.IAjaxDataModel<Models.IManufacturerDetailsModel>):
                        Shared.Models.IAjaxDataModel<Models.IManufacturerDetailsModel> {
                    self.manufacturer = data.model;
                    self.utility.extend(self.modelsList.list, self.manufacturer.models);
                    angular.extend(self.manufacturerList.widgets, data.dashboard);
                    return data;
                });
        }

        public saveManufacturer(model: Models.IVehicleManufacturerModel): ng.IHttpPromise<void> {
            const self: FleetService = this;
            let url: string;
            if (model.vehicleManufacturerId === 0) {
                url = "/api/fleet/manufactureradd";
            } else {
                url = "/api/fleet/manufacturerupdate";
            }

            return self.$http.post(url, model)
                .then(function (): ng.IHttpPromise<void> {
                    // updating the current manufacturer so that the view manufacturer screen gets refreshed properly.
                    self.manufacturer.name = model.name;
                    self.manufacturer.description = model.description;
                    return;
                });
        }

        public deleteManufacturer(vehicleManufacturerId: number): ng.IHttpPromise<void> {
            const self: FleetService = this;
            return self.$http.post<void>("/api/fleet/manufacturerdelete", vehicleManufacturerId);
        }

        public saveModel(model: Models.IVehicleManufacturerModelModel): ng.IHttpPromise<void> {
            const self: FleetService = this;
            let url: string;
            if (model.vehicleModelId === 0) {
                url = "/api/fleet/modeladd";
            } else {
                url = "/api/fleet/modelupdate";
            }
            return self.$http.post<void>(url, model);
        }

        public deleteModel(vehicleModelId: number): ng.IHttpPromise<void> {
            const self: FleetService = this;
            return self.$http.post<void>("/api/fleet/modeldelete", vehicleModelId);
        }

        public getVehicleDriverList(vehicleId: number): ng.IHttpPromise<Models.IVehicleDriverAssignmentModel[]> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/vehicledrivergetlist", { params: { "vehicleId": vehicleId } })
                .then(function (data: Models.IVehicleDriverAssignmentModel[]): Models.IVehicleDriverAssignmentModel[] {
                    self.utility.extend(self.vehicleDriverList, data);
                    return data;
                });
        }

        public saveVehiceDriver(model: Models.IVehicleDriverAssignmentModel): ng.IHttpPromise<void> {
            const self: FleetService = this;
            let url: string;
            if (model.vehicleDriverAssignmentId === 0) {
                url = "/api/fleet/vehicledriveradd";
            } else {
                url = "/api/fleet/vehicledriverupdate";
            }
            return self.$http.post<void>(url, model);
        }

        public getDriversListItems(vehicleId: number): ng.IHttpPromise<Shared.Models.IListItem<number, string>[]> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/driverslistget")
                .then(function (data: Shared.Models.IListItem<number, string>[]): Shared.Models.IListItem<number, string>[] {
                    self.driverListItems = data;
                    return data;
                });
        }

        public getCurrentService(vehicleServiceId: number): ng.IHttpPromise<Models.IVehicleServiceModel> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/vehicleserviceget", { params: { "vehicleServiceId": vehicleServiceId } })
                .then(function (data: Models.IVehicleServiceModel): Models.IVehicleServiceModel {
                    angular.extend(self.currentVehicleService, data);
                    return data;
                });
        }

        public saveVehicleService(model: Models.IVehicleServiceModel): ng.IHttpPromise<Models.IVehicleDetailsModel> {
            const self: FleetService = this;
            // for adding we need to populate the vehicleid
            if (model.vehicleId === 0) {
                model.vehicleId = self.vehicle.vehicleId;
            }
            let url: string;
            if (model.vehicleServiceId === 0) {
                url = "/api/fleet/vehicleserviceadd";
            } else {
                url = "/api/fleet/vehicleserviceupdate";
            }
            return self.$http.post(url, model)
                .then(function (data: Models.IVehicleDetailsModel): Models.IVehicleDetailsModel {
                    self.vehicle.serviceCost = data.serviceCost;
                    self.vehicle.serviceDate = new Date(data.serviceDate.toString());
                    self.utility.extend(self.vehicle.serviceRecord, data.serviceRecord);
                    return data;
                });
        }

        public getCurrentVehicle(vehicleId: number): ng.IHttpPromise<Models.IVehicleModel> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/vehicleget", { params: { "vehicleId": vehicleId } })
                .then(function (data: Models.IVehicleModel): Models.IVehicleModel {
                    angular.extend(self.currentVehicle, data);
                    if (vehicleId === 0) {
                        self.currentVehicle.vehicleTypeId = undefined;
                        self.currentVehicle.vehicleManufacturerId = undefined;
                        self.currentVehicle.vehicleModelId = undefined;
                        return data;
                    }
                });
        }

        public getCurrentManufacturer(manufacturerId: number): ng.IHttpPromise<Models.IVehicleManufacturerModel> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/manufacturerget", { params: { "manufacturerId": manufacturerId } })
                .then(function (data: Models.IVehicleManufacturerModel): Models.IVehicleManufacturerModel {
                    angular.extend(self.currentManufacturer, data);
                    return data;
                });
        }


        public saveVehicle(model: Models.IVehicleModel): ng.IHttpPromise<void> {
            const self: FleetService = this;
            let url: string;
            if (model.vehicleId === 0) {
                url = "/api/fleet/vehicleadd";
            } else {
                url = "/api/fleet/vehicleupdate";
            }

            return self.$http.post(url, model)
                .then(function (): ng.IHttpPromise<void> {
                    // updating the vehicle
                    self.vehicle.registrationNumber = model.registrationNumber;
                    self.vehicle.vehicleType = model.vehicleType;
                    self.vehicle.manufacturer = model.manufacturer;
                    self.vehicle.vehicleModel = model.vehicleModel;
                    return;
                });
        }

        public getVehicleTypes(): ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IVehicleTypeModel[]>> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/vehicletypesget")
                .then(function (data: Shared.Models.IAjaxDataModel<Models.IVehicleTypeModel[]>):
                    Shared.Models.IAjaxDataModel<Models.IVehicleTypeModel[]> {
                    self.utility.extend(self.vehicleTypes.list, data.model);
                    angular.extend(self.vehicleTypes.widgets, data.dashboard);
                    return data;
                });
        }

        public saveVehicleType(model: Models.IVehicleTypeModel): ng.IHttpPromise<void> {
            const self: FleetService = this;
            let url: string;
            if (model.vehicleTypeId === 0) {
                url = "/api/fleet/vehicletypeadd";
            } else {
                url = "/api/fleet/vehicletypeupdate";
            }

            return self.$http.post<void>(url, model);
        }

        public deleteVehicleType(vehicleTypeId: number): ng.IHttpPromise<void> {
            const self: FleetService = this;
            return self.$http.post<void>("/api/fleet/vehicletypedelete", vehicleTypeId);
        }

        public getDrivers(): ng.IHttpPromise<Shared.Models.IAjaxDataModel<Models.IVehicleDriverModel[]>> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/driversget")
                .then(function (data: Shared.Models.IAjaxDataModel<Models.IVehicleDriverModel[]>):
                    Shared.Models.IAjaxDataModel<Models.IVehicleDriverModel[]> {
                    self.utility.extend(self.drivers.list, data.model);
                    angular.extend(self.drivers.widgets, data.dashboard);
                    return data;
                });
        }

        public saveDriver(model: Models.IVehicleDriverModel): ng.IHttpPromise<void> {
            const self: FleetService = this;
            let url: string;
            if (model.vehicleDriverId === 0) {
                url = "/api/fleet/driveradd";
            } else {
                url = "/api/fleet/driverupdate";
            }
            return self.$http.post<void>(url, model);
        }

        public deleteDriver(vehicleDriverId: number): ng.IHttpPromise<void> {
            const self: FleetService = this;
            return self.$http.post<void>("/api/fleet/driverdelete", vehicleDriverId);
        }

        public getServiceReport(vehicleServiceId: number, startDate: Date, endDate: Date): ng.IHttpPromise<Models.IVehicleServiceModel[]> {
            const self: FleetService = this;
            return self.$http.get("/api/fleet/vehicleservicereportget",
                { params: { "vehicleServiceId": vehicleServiceId, "StartDate": startDate, "EndDate": endDate } });
        }
    }
}
