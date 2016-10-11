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
        let Route = class Route {
            constructor($stateProvider, $windowProvider) {
                let virtualPath = $windowProvider.$get().virtualDirectory;
                $stateProvider
                    .state("vehiclelist", {
                    url: virtualPath + "/vehiclelist",
                    title: "Vehicle List",
                    previousState: "dashboard",
                    templateUrl: "/app/fleet/vehiclelist.html",
                    controller: "vehicleList",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['vehicleService', function (vehicleService) {
                                return vehicleService.getVehicleList();
                            }]
                    }
                })
                    .state("manufacturerlist", {
                    url: virtualPath + "/manufacturerlist",
                    title: "Manufacturer List",
                    previousState: "dashboard",
                    templateUrl: "/app/fleet/manufacturerlist.html",
                    controller: "manufacturerList",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['vehicleService', function (vehicleService) {
                                return vehicleService.getManufacturerList();
                            }]
                    }
                })
                    .state("vehicle", {
                    url: virtualPath + "/vehicle/:vehicleid",
                    title: "Vehicle",
                    previousState: "vehiclelist",
                    templateUrl: "/app/fleet/vehicle.html",
                    controller: "vehicle",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                                return vehicleService.getVehicle($stateParams.vehicleid);
                            }]
                    }
                })
                    .state("vehicle.service", {
                    url: "/service",
                    title: "Vehicle",
                    previousState: "vehiclelist",
                    templateUrl: virtualPath + "/app/fleet/vehicleServiceRecord.html",
                    controller: "vehicleServiceRecord",
                    controllerAs: "vm",
                })
                    .state("vehicle.fuel", {
                    url: "/fuel",
                    title: "Vehicle",
                    previousState: "vehiclelist",
                    templateUrl: virtualPath + "/app/fleet/vehicleFuel.html",
                    controller: "vehicleFuel",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                                return vehicleService.getFuelList($stateParams.vehicleid);
                            }]
                    }
                })
                    .state("vehicle.driver", {
                    url: "/driver",
                    title: "Vehicle",
                    previousState: "vehiclelist",
                    templateUrl: virtualPath + "/app/fleet/vehicleDriver.html",
                    controller: "vehicleDriver",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                                return vehicleService.getVehicleDriverList($stateParams.vehicleid);
                            }]
                    }
                })
                    .state("vehicle.vehicletrip", {
                    url: "/vehicletrip",
                    title: "Vehicle",
                    previousState: "vehiclelist",
                    templateUrl: virtualPath + "/app/fleet/vehicleTrip.html",
                    controller: "vehicleTrip",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                                return vehicleService.getTripList($stateParams.vehicleid);
                            }]
                    }
                })
                    .state("vehicletype", {
                    url: virtualPath + "/vehicletype",
                    title: "Vehicle Types",
                    previousState: "dashboard",
                    templateUrl: "/app/fleet/vehicletype.html",
                    controller: Fleet.VehicleType,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Fleet.FleetService", function (fleetService) {
                                return fleetService.getVehicleTypes();
                            }]
                    }
                })
                    .state("servicereport", {
                    url: virtualPath + "/servicereport",
                    title: "Service Report",
                    previousState: "dashboard",
                    templateUrl: "/app/fleet/servicereport.html",
                    controller: "servicereport",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ['vehicleService', function (vehicleService) {
                                return vehicleService.getVehicleList();
                            }]
                    }
                })
                    .state("driver", {
                    url: virtualPath + "/driver",
                    title: "Drivers",
                    previousState: "dashboard",
                    templateUrl: "/app/fleet/driver.html",
                    controller: Fleet.Driver,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Fleet.FleetService", function (fleetService) {
                                return fleetService.getDrivers();
                            }]
                    }
                })
                    .state("manufacturer", {
                    url: virtualPath + "/manufacturer/:manufacturerid",
                    title: "Manufacturer",
                    previousState: "manufacturerList",
                    templateUrl: "/app/fleet/manufacturer.html",
                    controller: "manufacturer",
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["$stateParams", "vehicleService", function ($stateParams, vehicleService) {
                                return vehicleService.getManufacturer($stateParams.manufacturerid);
                            }]
                    }
                });
            }
        };
        Route = __decorate([
            MegaMine.config("megamine"),
            MegaMine.inject("$stateProvider", "$windowProvider")
        ], Route);
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Route.js.map