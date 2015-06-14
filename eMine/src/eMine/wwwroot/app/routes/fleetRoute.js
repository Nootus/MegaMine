'use strict';

angular.module('emine').config(fleetRoute);
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
            resolve: ['vehicleService', function (vehicleService) {
                return vehicleService.getVehicleList();
            }]
        })

         .state("manufacturerlist", {
             url: window.virtualDirectory + "/manufacturerlist",
             title: "Manufacturer List",
             previousState: "dashboard",
             templateUrl: "/app/fleet/manufacturerlist.html",
             controller: "manufacturerList",
             controllerAs: "vm",
             resolve: ['vehicleService', function (vehicleService) {
                 return vehicleService.getManufacturerList();
             }]
         })

    

        .state("vehicle", {
            url: window.virtualDirectory + "/vehicle/:vehicleid",
            title: "Vehicle",
            previousState: "vehiclelist",
            templateUrl: "/app/fleet/vehicle.html",
            controller: "vehicle",
            controllerAs: "vm",
            resolve: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                return vehicleService.getVehicle($stateParams.vehicleid);
            }]
        })

        .state("vehicle.service", {
            url: "/service",
            title: "Vehicle",
            previousState: "vehiclelist",
            templateUrl: window.virtualDirectory + "/app/fleet/serviceRecord.html",
            controller: "serviceRecord",
            controllerAs: "vm",
        })
        .state("vehicle.fuel", {
            url: "/fuel",
            title: "Vehicle",
            previousState: "vehiclelist",
            templateUrl: window.virtualDirectory + "/app/fleet/fuel.html",
            controller: "fuel",
            controllerAs: "vm",
            resolve: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                return vehicleService.getFuelList($stateParams.vehicleid);
            }]
        })
        .state("vehicle.driver", {
            url: "/driver",
            title: "Vehicle",
            previousState: "vehiclelist",
            templateUrl: window.virtualDirectory + "/app/fleet/vehicleDriver.html",
            controller: "vehicleDriver",
            controllerAs: "vm",
            resolve: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                return vehicleService.getVehicleDriverList($stateParams.vehicleid);
            }]
        })


        .state("vehicletype", {
            url: window.virtualDirectory + "/vehicletype",
            title: "Vehicle Types",
            previousState: "dashboard",
            templateUrl: "/app/fleet/vehicletype.html",
            controller: "vehicleType",
            controllerAs: "vm",
            resolve: ['vehicleService', function (vehicleService) {
                return vehicleService.getVehicleType();
            }]
        })
        .state("sparepartlist", {
            url: window.virtualDirectory + "/sparepartlist",
            title: "Spare Parts",
            previousState: "dashboard",
            templateUrl: "/app/fleet/sparepartlist.html",
            controller: "sparePartList",
            controllerAs: "vm",
            resolve: ['vehicleService', function (vehicleService) {
                return vehicleService.getSparePartList();
            }]
        })
       .state("driver", {
            url: window.virtualDirectory + "/driver",
            title: "Drivers",
            previousState: "dashboard",
            templateUrl: "/app/fleet/driver.html",
            controller: "driver",
            controllerAs: "vm",
            resolve: ['vehicleService', function (vehicleService) {
                return vehicleService.getDrivers();
            }]
        })
        .state("sparepart", {
              url: window.virtualDirectory + "/sparepart/:sparepartid",
              title: "Spare Part",
              previousState: "sparepartlist",
              templateUrl: "/app/fleet/sparepart.html",
              controller: "sparePart",
              controllerAs: "vm",
              resolve: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService) {
                  return vehicleService.getSparePart($stateParams.sparepartid);
              }]
          })

        .state("manufacturer", {
            url: window.virtualDirectory + "/manufacturer/:manufacturerid",
            title: "Manufacturer",
            previousState: "manufacturerList",
            templateUrl: "/app/fleet/manufacturer.html",
            controller: "manufacturer",
            controllerAs: "vm",
            resolve: ['$stateParams', 'vehicleService', function ($stateParams, vehicleService)
            {
                return vehicleService.getCurrentManufacturer($stateParams.manufacturerid);
                //return vehicleService.getCurrentManufacturer(4);
            }]
        })
}
