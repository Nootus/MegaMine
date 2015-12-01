'use strict';

angular.module('megamine').config(fleetRoute);
fleetRoute.$inject = ['$stateProvider'];

function fleetRoute($stateProvider) {

    $stateProvider
        .state("vehiclelist", {
            url: window.virtualDirectory + "/vehiclelist",
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
             url: window.virtualDirectory + "/manufacturerlist",
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
            url: window.virtualDirectory + "/vehicle/:vehicleid",
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
            templateUrl: window.virtualDirectory + "/app/fleet/serviceHistory.html",
            controller: "serviceRecord",
            controllerAs: "vm",
        })

        .state("vehicle.fuel", {
            url: "/fuel",
            title: "Vehicle",
            previousState: "vehiclelist",
            templateUrl: window.virtualDirectory + "/app/fleet/vehicleFuel.html",
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
            templateUrl: window.virtualDirectory + "/app/fleet/vehicleDriver.html",
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
              templateUrl: window.virtualDirectory + "/app/fleet/vehicleTrip.html",
              controller: "vehicleTrip",
              controllerAs: "vm",
              resolve: {
                  resolveModel: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                      return vehicleService.getTripList($stateParams.vehicleid);
                  }]
              }
          })

        .state("vehicletype", {
            url: window.virtualDirectory + "/vehicletype",
            title: "Vehicle Types",
            previousState: "dashboard",
            templateUrl: "/app/fleet/vehicletype.html",
            controller: "vehicleType",
            controllerAs: "vm",
            resolve: {
                resolveModel: ['vehicleService', function (vehicleService) {
                    return vehicleService.getVehicleType();
                }]
            }
        })

        .state("servicereport", {
            url: window.virtualDirectory + "/servicereport",
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

        .state("sparepartlist", {
            url: window.virtualDirectory + "/sparepartlist",
            title: "Spare Parts",
            previousState: "dashboard",
            templateUrl: "/app/fleet/sparepartlist.html",
            controller: "sparePartList",
            controllerAs: "vm",
            resolve: {
                resolveModel: ['vehicleService', function (vehicleService) {
                    return vehicleService.getSparePartList();
                }]
            }
        })

        .state("driver", {
            url: window.virtualDirectory + "/driver",
            title: "Drivers",
            previousState: "dashboard",
            templateUrl: "/app/fleet/driver.html",
            controller: "driver",
            controllerAs: "vm",
            resolve: {
                resolveModel: ['vehicleService', function (vehicleService) {
                    return vehicleService.getDrivers();
                }]
            }
        })

        .state("sparepart", {
              url: window.virtualDirectory + "/sparepart/:sparepartid",
              title: "Spare Part",
              previousState: "sparepartlist",
              templateUrl: "/app/fleet/sparepart.html",
              controller: "sparePart",
              controllerAs: "vm",
              resolve: {
                  resolveModel: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                      return vehicleService.getSparePart($stateParams.sparepartid);
                  }]
              }
          })

        .state("manufacturer", {
            url: window.virtualDirectory + "/manufacturer/:manufacturerid",
            title: "Manufacturer",
            previousState: "manufacturerList",
            templateUrl: "/app/fleet/manufacturer.html",
            controller: "manufacturer",
            controllerAs: "vm",
            resolve: {
                resolveModel: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                    return vehicleService.getManufacturer($stateParams.manufacturerid);
                    //return vehicleService.getCurrentManufacturer(4);
                }]
            }
        })
}
