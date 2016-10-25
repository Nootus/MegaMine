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
        let FleetService = class FleetService {
            constructor($http, utility) {
                this.$http = $http;
                this.utility = utility;
                // master tables
                this.vehicleTypes = {
                    list: [],
                    widgets: {}
                };
                this.drivers = {
                    list: [],
                    widgets: {}
                };
                // vehicles
                this.vehicleList = {
                    list: [],
                    widgets: {}
                };
                this.vehicle = {};
                this.currentVehicle = {};
                this.currentVehicleService = {};
                // fuel
                this.fuelList = [];
                // vehicle driver
                this.vehicleDriverList = [];
                this.driverListItems = [];
                // manufacturers data types
                this.manufacturerList = {
                    list: [],
                    widgets: {}
                };
                this.manufacturer = {};
                this.currentManufacturer = {};
                // models
                this.modelsList = {
                    list: [],
                    widgets: {}
                };
                // trips
                this.tripsList = [];
            }
            getVehicleList() {
                const self = this;
                return self.$http.get("/api/fleet/vehiclelist")
                    .then(function (data) {
                    self.utility.extend(self.vehicleList.list, data.model);
                    angular.extend(self.vehicleList.widgets, data.dashboard);
                    return data;
                });
            }
            getVehicle(vehicleId) {
                const self = this;
                return self.$http.get("/api/fleet/vehicledetailsget", { params: { "vehicleId": vehicleId } })
                    .then(function (data) {
                    self.vehicle = data;
                    return data;
                });
            }
            resetFuelAverage(vehicleId) {
                const self = this;
                return self.$http.post("/api/fleet/vehiclefuelreset", vehicleId);
            }
            getTripList(vehicleId) {
                const self = this;
                return self.$http.get("/api/fleet/vehicletriplistget", { params: { "vehicleId": vehicleId } })
                    .then(function (data) {
                    self.utility.extend(self.tripsList, data);
                    return data;
                });
            }
            saveTrip(model) {
                const self = this;
                let url;
                if (model.vehicleTripId === 0) {
                    url = "/api/fleet/vehicletripadd";
                }
                else {
                    url = "/api/fleet/vehicletripupdate";
                }
                return self.$http.post(url, model);
            }
            getFuelList(vehicleId) {
                const self = this;
                return self.$http.get("/api/fleet/fuelgetlist", { params: { "vehicleId": vehicleId } })
                    .then(function (data) {
                    self.utility.extend(self.fuelList, data);
                    return data;
                });
            }
            saveFuel(model) {
                const self = this;
                let url;
                if (model.vehicleFuelId === 0) {
                    url = "/api/fleet/fueladd";
                }
                else {
                    url = "/api/fleet/fuelupdate";
                }
                return self.$http.post(url, model);
            }
            getManufacturerList() {
                const self = this;
                return self.$http.get("/api/fleet/manufacturersget")
                    .then(function (data) {
                    self.utility.extend(self.manufacturerList.list, data.model);
                    angular.extend(self.manufacturerList.widgets, data.dashboard);
                    return data;
                });
            }
            getManufacturer(manufacturerId) {
                const self = this;
                return self.$http.get("/api/fleet/manufacturerdetailsget", { params: { "manufacturerId": manufacturerId } })
                    .then(function (data) {
                    self.manufacturer = data.model;
                    self.utility.extend(self.modelsList.list, self.manufacturer.models);
                    angular.extend(self.manufacturerList.widgets, data.dashboard);
                    return data;
                });
            }
            saveManufacturer(model) {
                const self = this;
                let url;
                if (model.vehicleManufacturerId === 0) {
                    url = "/api/fleet/manufactureradd";
                }
                else {
                    url = "/api/fleet/manufacturerupdate";
                }
                return self.$http.post(url, model)
                    .then(function () {
                    // updating the current manufacturer so that the view manufacturer screen gets refreshed properly.
                    self.manufacturer.name = model.name;
                    self.manufacturer.description = model.description;
                    return;
                });
            }
            deleteManufacturer(vehicleManufacturerId) {
                const self = this;
                return self.$http.post("/api/fleet/manufacturerdelete", vehicleManufacturerId);
            }
            saveModel(model) {
                const self = this;
                let url;
                if (model.vehicleModelId === 0) {
                    url = "/api/fleet/modeladd";
                }
                else {
                    url = "/api/fleet/modelupdate";
                }
                return self.$http.post(url, model);
            }
            deleteModel(vehicleModelId) {
                const self = this;
                return self.$http.post("/api/fleet/modeldelete", vehicleModelId);
            }
            getVehicleDriverList(vehicleId) {
                const self = this;
                return self.$http.get("/api/fleet/vehicledrivergetlist", { params: { "vehicleId": vehicleId } })
                    .then(function (data) {
                    self.utility.extend(self.vehicleDriverList, data);
                    return data;
                });
            }
            saveVehiceDriver(model) {
                const self = this;
                let url;
                if (model.vehicleDriverAssignmentId === 0) {
                    url = "/api/fleet/vehicledriveradd";
                }
                else {
                    url = "/api/fleet/vehicledriverupdate";
                }
                return self.$http.post(url, model);
            }
            getDriversListItems(vehicleId) {
                const self = this;
                return self.$http.get("/api/fleet/driverslistget")
                    .then(function (data) {
                    self.driverListItems = data;
                    return data;
                });
            }
            getCurrentService(vehicleServiceId) {
                const self = this;
                return self.$http.get("/api/fleet/vehicleserviceget", { params: { "vehicleServiceId": vehicleServiceId } })
                    .then(function (data) {
                    angular.extend(self.currentVehicleService, data);
                    return data;
                });
            }
            saveVehicleService(model) {
                const self = this;
                // for adding we need to populate the vehicleid
                if (model.vehicleId === 0) {
                    model.vehicleId = self.vehicle.vehicleId;
                }
                let url;
                if (model.vehicleServiceId === 0) {
                    url = "/api/fleet/vehicleserviceadd";
                }
                else {
                    url = "/api/fleet/vehicleserviceupdate";
                }
                return self.$http.post(url, model)
                    .then(function (data) {
                    self.vehicle.serviceCost = data.serviceCost;
                    self.vehicle.serviceDate = new Date(data.serviceDate.toDateString());
                    self.utility.extend(self.vehicle.serviceRecord, data.serviceRecord);
                    return data;
                });
            }
            getCurrentVehicle(vehicleId) {
                const self = this;
                return self.$http.get("/api/fleet/vehicleget", { params: { "vehicleId": vehicleId } })
                    .then(function (data) {
                    angular.extend(self.currentVehicle, data);
                    if (vehicleId === 0) {
                        self.currentVehicle.vehicleTypeId = undefined;
                        self.currentVehicle.vehicleManufacturerId = undefined;
                        self.currentVehicle.vehicleModelId = undefined;
                        return data;
                    }
                });
            }
            getCurrentManufacturer(manufacturerId) {
                const self = this;
                return self.$http.get("/api/fleet/manufacturerget", { params: { "manufacturerId": manufacturerId } })
                    .then(function (data) {
                    angular.extend(self.currentManufacturer, data);
                    return data;
                });
            }
            saveVehicle(model) {
                const self = this;
                let url;
                if (model.vehicleId === 0) {
                    url = "/api/fleet/vehicleadd";
                }
                else {
                    url = "/api/fleet/vehicleupdate";
                }
                return self.$http.post(url, model)
                    .then(function () {
                    // updating the vehicle
                    self.vehicle.registrationNumber = model.registrationNumber;
                    self.vehicle.vehicleType = model.vehicleType;
                    self.vehicle.manufacturer = model.manufacturer;
                    self.vehicle.vehicleModel = model.vehicleModel;
                    return;
                });
            }
            getVehicleTypes() {
                const self = this;
                return self.$http.get("/api/fleet/vehicletypesget")
                    .then(function (data) {
                    self.utility.extend(self.vehicleTypes.list, data.model);
                    angular.extend(self.vehicleTypes.widgets, data.dashboard);
                    return data;
                });
            }
            saveVehicleType(model) {
                const self = this;
                let url;
                if (model.vehicleTypeId === 0) {
                    url = "/api/fleet/vehicletypeadd";
                }
                else {
                    url = "/api/fleet/vehicletypeupdate";
                }
                return self.$http.post(url, model);
            }
            deleteVehicleType(vehicleTypeId) {
                const self = this;
                return self.$http.post("/api/fleet/vehicletypedelete", vehicleTypeId);
            }
            getDrivers() {
                const self = this;
                return self.$http.get("/api/fleet/driversget")
                    .then(function (data) {
                    self.utility.extend(self.drivers.list, data.model);
                    angular.extend(self.drivers.widgets, data.dashboard);
                    return data;
                });
            }
            saveDriver(model) {
                const self = this;
                let url;
                if (model.vehicleDriverId === 0) {
                    url = "/api/fleet/driveradd";
                }
                else {
                    url = "/api/fleet/driverupdate";
                }
                return self.$http.post(url, model);
            }
            deleteDriver(vehicleDriverId) {
                const self = this;
                return self.$http.post("/api/fleet/driverdelete", vehicleDriverId);
            }
            getServiceReport(vehicleServiceId, startDate, endDate) {
                const self = this;
                return self.$http.get("/api/fleet/vehicleservicereportget", { params: { "vehicleServiceId": vehicleServiceId, "StartDate": startDate, "EndDate": endDate } });
            }
        };
        FleetService = __decorate([
            MegaMine.service("megamine", "MegaMine.Fleet.FleetService"),
            MegaMine.inject("$http", "MegaMine.Shared.Utility")
        ], FleetService);
        Fleet.FleetService = FleetService;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=FleetService.js.map