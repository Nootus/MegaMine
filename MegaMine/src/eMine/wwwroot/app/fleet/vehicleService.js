'use strict'

angular.module('megamine').factory('vehicleService', vehicleService);

vehicleService.$inject = ['$http'];

function vehicleService($http) {

    var service = {
        //master tables
        vehicleTypes: [],
        drivers: [],

        //vehicles
        vehicleList: [],
        vehicle: {},
        currentVehicle: {},
        currentVehicleService: {},
        vehicleServiceList: {},
        getServiceReport: getServiceReport,

        //vehicles
        getVehicleList: getVehicleList,
        getVehicle: getVehicle,
        getCurrentVehicle: getCurrentVehicle,
        getCurrentService: getCurrentService,
        saveVehicle: saveVehicle,
        saveVehicleService: saveVehicleService,

        //fuel
        fuelList: [],
        getFuelList: getFuelList,
        saveFuel: saveFuel,
        resetFuelAverage: resetFuelAverage,

        //vehicle driver
        vehicleDriverList: [],
        driverListItems: [],
        getVehicleDriverList: getVehicleDriverList,
        getDriversListItems: getDriversListItems,
        saveVehiceDriver: saveVehiceDriver,

        //vehicle types
        getVehicleType: getVehicleType,
        saveVehicleType: saveVehicleType,

        //drivers
        getDrivers: getDrivers,
        saveDriver: saveDriver,
        
        //spare parts
        sparePartList: [],
        sparePart: {},
        currentSparePart: {},
        currentSparePartOrder: {},

        //spare parts
        getSparePartList: getSparePartList,
        getSparePart: getSparePart,
        getCurrentSparePart: getCurrentSparePart,
        getCurrentSparePartOrder: getCurrentSparePartOrder,
        saveSparePart: saveSparePart,
        saveSparePartOrder: saveSparePartOrder,

        //Manufacturers data types
        manufacturerList: [],
        manufacturer: {},
        currentManufacturer: {},

        //Manufacturers methods
        getManufacturerList: getManufacturerList,
        getCurrentManufacturer: getCurrentManufacturer,
        saveManufacturer: saveManufacturer,
        getManufacturer: getManufacturer,

        //Models
        modelsList: [],
        getModelsList: getModelsList,
        saveModel: saveModel,

        //Orders
        ordersList: [],

        //Trips
        tripsList: [],
        getTripList: getTripList,
        saveTrip: saveTrip,
    };

    return service;

    function getVehicleList() {
        return $http.get("/api/fleet/vehiclelist")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.vehicleList.splice(0, service.vehicleList.length);
                angular.extend(service.vehicleList, data);
            })
    }

    function getManufacturerList() {
        return $http.get("/api/fleet/manufacturersGet")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and add them again
                service.manufacturerList.splice(0, service.manufacturerList.length);
                angular.extend(service.manufacturerList, data);
            })
    }

    function getVehicle(vehicleId) {
        return $http.get("/api/fleet/vehicledetailsget", { params: { "vehicleId": vehicleId } })
            .then(function (data) {
                service.vehicle = data
            })
    }

    function resetFuelAverage(vehicleId) {
        return $http.post("/api/fleet/vehiclefuelreset", vehicleId);
    }

    function getManufacturer(manufacturerId) {
        return $http.get("/api/fleet/manufacturerdetailsget", { params: { "manufacturerId": manufacturerId } })
            .then(function (data) {
                service.manufacturer = data
                service.modelsList.splice(0, service.modelsList.length);
                angular.extend(service.modelsList, service.manufacturer.models);
            })
    }

    function getTripList(vehicleId)
    {
        return $http.get("/api/fleet/vehicletriplistget", { params: { "vehicleId": vehicleId } })
            .then(function (data)
            {
                service.tripsList.splice(0, service.tripsList.length);
                angular.extend(service.tripsList, data);
            })
    }

    function saveTrip(model)
    {
        var url;
        if (model.vehicleTripId === 0) {
            url = "/api/fleet/vehicletripadd";
        }
        else {
            url = "/api/fleet/vehicletripupdate";
        }
        return $http.post(url, model);
    }


    function getFuelList(vehicleId) {
        return $http.get("/api/fleet/fuelgetlist", { params: { "vehicleId": vehicleId } })
            .then(function (data) {
                service.fuelList.splice(0, service.fuelList.length);
                angular.extend(service.fuelList, data);
            })
    }


    function getModelsList(modelId) {
        return $http.get("/api/fleet/getModelsList", { params: { "modelId": modelId } })
            .then(function (data) {
                service.modelsList.splice(0, service.modelsList.length);
                angular.extend(service.modelsList, data);
            })
    }
    
    function saveFuel(model) {
        var url;
        if (model.vehicleFuelId === 0) {
            url = "/api/fleet/fueladd";
        }
        else {
            url = "/api/fleet/fuelupdate";
        }
        return $http.post(url, model);
    }

    function saveModel(model)
    {
        var url;
        if (model.vehicleModelId === 0) {
            url = "/api/fleet/modeladd";
        }
        else {
            url = "/api/fleet/modelupdate";
        }
        return $http.post(url, model);
    }

    function getVehicleDriverList(vehicleId)
    {
        return $http.get("/api/fleet/vehicledrivergetlist", { params: { "vehicleId": vehicleId } })
            .then(function (data)
            {
                service.vehicleDriverList.splice(0, service.vehicleDriverList.length);
                angular.extend(service.vehicleDriverList, data);
            })
    }

    function saveVehiceDriver(model)
    {
        var url;
        if (model.vehicleDriverAssignmentId === 0) {
            url = "/api/fleet/vehicledriveradd"
        }
        else {
            url = "/api/fleet/vehicledriverupdate"
        }
        return $http.post(url, model);
    }

    function getDriversListItems(vehicleId)
    {
        return $http.get("/api/fleet/driverslistget")
            .then(function (data) {
                service.driverListItems = data
            })
    }


    function getCurrentService(vehicleServiceId)
    {
        return $http.get("/api/fleet/vehicleserviceget", { params: { "vehicleServiceId": vehicleServiceId } })
            .then(function (data) {
                angular.extend(service.currentVehicleService, data);
            })
    }

    function saveVehicleService(model)
    {
        //for adding we need to populate the vehicleid
        if (model.vehicleId === 0) {
            model.vehicleId = service.vehicle.vehicleId;
        }
        var url;
        if (model.vehicleServiceId === 0) {
            url = "/api/fleet/vehicleserviceadd";
        }
        else {
            url = "/api/fleet/vehicleserviceupdate";
        }
        return $http.post(url, model)
            .then(function (data) {
                service.vehicle.serviceCost = data.serviceCost;
                service.vehicle.serviceDate = new Date(data.serviceDate);
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.vehicle.serviceRecord.splice(0, service.vehicle.serviceRecord.length);
                angular.extend(service.vehicle.serviceRecord, data.serviceRecord);
            })
    }

    function getCurrentVehicle(vehicleId)
    {
        return $http.get("/api/fleet/vehicleget", { params: { "vehicleId": vehicleId } })
            .then(function (data) {
                angular.extend(service.currentVehicle, data);
                if (vehicleId === 0) {
                    service.currentVehicle.vehicleTypeId = undefined;
                    service.currentVehicle.vehicleManufacturerId = undefined;
                    service.currentVehicle.vehicleModelId = undefined;
                }
            })
    }

    function getCurrentManufacturer(manufacturerId) {
        return $http.get("/api/fleet/manufacturerget", { params: { "manufacturerId": manufacturerId } })
            .then(function (data) {
                angular.extend(service.currentManufacturer, data);
            })
    }


    function saveVehicle(model) {
        var url;
        if (model.VehicleId === 0) {
            url = "/api/fleet/vehicleadd";
        }
        else {
            url = "/api/fleet/vehicleupdate";
        }

        return $http.post(url, model)
            .then(function (data) {
                //updating the vehicle
                service.vehicle.registrationNumber = model.registrationNumber;
                service.vehicle.vehicleType = model.vehicleType;
                service.vehicle.manufacturer = model.manufacturer;
                service.vehicle.vehicleModel = model.vehicleModel;
            });
    }

    function saveManufacturer(model) {
        var url;
        if (model.vehicleManufacturerId === 0) {
            url = "/api/fleet/manufactureradd";
        }
        else {
            url = "/api/fleet/manufacturerupdate";
        }

        return $http.post(url, model)
            .then(function (data)
            {
                //updating the current manufacturer so that the view manufacturer screen gets refreshed properly.
                service.manufacturer.name = model.name;
                service.manufacturer.description = model.description;
               
            });
    }

    function getVehicleType() {
        return $http.get("/api/fleet/vehicletypelistget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.vehicleTypes.splice(0, service.vehicleTypes.length);
                angular.extend(service.vehicleTypes, data);
            })
    }

    function saveVehicleType(model) {
        var url;
        if (model.vehicleTypeId === 0) {
            url = "/api/fleet/vehicletypeadd";
        }
        else {
            url = "/api/fleet/vehicletypeupdate";
        }

        return $http.post(url, model);
    }

    function getDrivers() {
        return $http.get("/api/fleet/driversget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.drivers.splice(0, service.drivers.length);
                angular.extend(service.drivers, data);
            })
    }

    function saveDriver(model) {
        var url;
        if (model.vehicleDriverId === 0) {
            url = "/api/fleet/driveradd";
        }
        else {
            url = "/api/fleet/driverupdate";
        }
        return $http.post(url, model);
    }

    function getSparePartList()
    {
        return $http.get("/api/fleet/sparepartlistget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.sparePartList.splice(0, service.sparePartList.length);
                angular.extend(service.sparePartList, data);
            })
    }

    function getCurrentSparePart(sparePartId) {
        return $http.get("/api/fleet/sparepartget", { params: { "sparePartId": sparePartId } })
            .then(function (data) {
                angular.extend(service.currentSparePart, data);
            })
    }

    function getServiceReport(vehicleServiceId, StartDate, EndDate)
    {
        return $http.get("/api/fleet/VehicleServiceReportGet", { params: { "vehicleServiceId": vehicleServiceId, "StartDate": StartDate, "EndDate": EndDate } })
    }
        
    function saveSparePart(model)
    {
        var url;
        if (model.sparePartId === 0) {
            url = "/api/fleet/sparepartadd";
        }
        else {
            url = "/api/fleet/sparepartupdate";
        }
        return $http.post(url, model);
    }

    function getSparePart(sparePartId) {
        return $http.get("/api/fleet/sparepartdetailsget", { params: { "sparePartId": sparePartId } })
            .then(function (data) {
                angular.extend(service.sparePart, data);
                service.ordersList.splice(0, service.ordersList.length);
                angular.extend(service.ordersList, service.sparePart.orders);
            })
    }

    function getCurrentSparePartOrder(sparePartOrderId) {
        return $http.get("/api/fleet/sparepartorderget", { params: { "sparePartOrderId": sparePartOrderId } })
            .then(function (data) {
                angular.extend(service.currentSparePartOrder, data);
                service.currentSparePartOrder.orderedUTCdatetime = new Date(service.currentSparePartOrder.orderedUTCdatetime);
            })
    }

    function saveSparePartOrder(model) {
        var url;
        if (model.sparePartOrderId === 0) {
            url = "/api/fleet/sparepartorderadd";
        }
        else {
            url = "/api/fleet/sparepartorderupdate";
        }
        return $http.post(url, model);
    }

}
