'use strict'

angular.module('emine').factory('quarryService', quarryService);

quarryService.$inject = ['$http'];

function quarryService($http) {

    var service = {
        //colours
        colours: [],
        getMaterialColours: getMaterialColours,
        saveMaterialColour: saveMaterialColour,

        //product types
        productTypes: [],
        getProductTypes: getProductTypes,
        saveProductType: saveProductType,

        //quarries
        quarries: [],
        getQuarries: getQuarries,
        saveQuarry: saveQuarry,

        //yards
        yards: [],
        getYards: getYards,
        saveYard: saveYard,

        //material
        materialViewModel: {},
        getMaterialViewModel: getMaterialViewModel,
        saveMaterial: saveMaterial
    };

    return service;

    //Material Colour
    function getMaterialColours() {
        return $http.get("/api/quarry/materialcoloursget")
            .success(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.colours.splice(0, service.colours.length);
                angular.extend(service.colours, data);
            });
    }

    function saveMaterialColour(model) {
        var url;
        if (model.MaterialColourId === 0) {
            url = "/api/quarry/materialcolouradd";
        }
        else {
            url = "/api/quarry/materialcolourupdate";
        }

        return $http.post(url, model);
    }

    //Product Types
    function getProductTypes() {
        return $http.get("/api/quarry/producttypesget")
            .success(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.productTypes.splice(0, service.productTypes.length);
                angular.extend(service.productTypes, data);
            });
    }

    function saveProductType(model) {
        var url;
        if (model.ProductTypeId === 0) {
            url = "/api/quarry/producttypeadd";
        }
        else {
            url = "/api/quarry/producttypeupdate";
        }

        return $http.post(url, model);
    }

    //Quarry
    function getQuarries() {
        return $http.get("/api/quarry/quarriesget")
            .success(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.quarries.splice(0, service.quarries.length);
                angular.extend(service.quarries, data);
            });
    }

    function saveQuarry(model) {
        var url;
        if (model.QuarryId === 0) {
            url = "/api/quarry/quarryadd";
        }
        else {
            url = "/api/quarry/quarryupdate";
        }

        return $http.post(url, model);
    }

    //Yardsrry
    function getYards() {
        return $http.get("/api/quarry/yardsget")
            .success(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.yards.splice(0, service.yards.length);
                angular.extend(service.yards, data);
            });
    }

    function saveYard(model) {
        var url;
        if (model.YardId === 0) {
            url = "/api/quarry/yardadd";
        }
        else {
            url = "/api/quarry/yardupdate";
        }

        return $http.post(url, model);
    }

    //material
    function getMaterialViewModel() {
        return $http.get("/api/quarry/materialviewmodelget")
            .success(function (data) {
                service.materialViewModel = data;
            });
    }
    function saveMaterial(models) {
        return $http.post("/api/quarry/materialsave", models);
    }

    
}