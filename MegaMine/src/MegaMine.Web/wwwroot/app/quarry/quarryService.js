'use strict'

angular.module('megamine').factory('quarryService', quarryService);

quarryService.$inject = ['$http'];

function quarryService($http) {

    var service = {
        //colours
        colours: [],
        getMaterialColours: getMaterialColours,
        saveMaterialColour: saveMaterialColour,
        deleteMaterialColour: deleteMaterialColour,

        //product types
        productTypes: [],
        getProductTypes: getProductTypes,
        saveProductType: saveProductType,
        deleteProductType: deleteProductType,

        //quarries
        quarries: [],
        getQuarries: getQuarries,
        saveQuarry: saveQuarry,
        deleteQuarry: deleteQuarry,

        //yards
        yards: [],
        groupYards: [],
        getYards: getYards,
        saveYard: saveYard,
        deleteYard: deleteYard,
        getGroupYards: getGroupYards,

        //material
        materialViewModel: {},
        getMaterialViewModel: getMaterialViewModel,
        saveMaterial: saveMaterial,

        //stockyard & Material Movement
        stock: [],
        getStock: getStock,
        moveMaterial: moveMaterial,
        materialUpdate: materialUpdate,
        materialDelete: materialDelete,

        //reports
        quarrySummary: [],
        quarrySummaryDetails: [],
        quarrySummaryGet: quarrySummaryGet,
        getQuarrySummaryDetails: getQuarrySummaryDetails,

        //product summary
        productSummaryVM: {},
        productSummary: [],
        productSummaryDetails: [],
        productSummaryGet: productSummaryGet,
        productSummarySearch: productSummarySearch,
        getProductSummaryDetails: getProductSummaryDetails,

    };

    return service;

    //Material Colour
    function getMaterialColours() {
        return $http.get("/api/quarry/materialcoloursget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.colours.splice(0, service.colours.length);
                angular.extend(service.colours, data);
            });
    }

    function saveMaterialColour(model) {
        var url;
        if (model.materialColourId === 0) {
            url = "/api/quarry/materialcolouradd";
        }
        else {
            url = "/api/quarry/materialcolourupdate";
        }

        return $http.post(url, model);
    }

    function deleteMaterialColour(materialColourId) {
        return $http.post("/api/quarry/materialcolourdelete", materialColourId);
    }

    //Product Types
    function getProductTypes() {
        return $http.get("/api/quarry/producttypesget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.productTypes.splice(0, service.productTypes.length);
                angular.extend(service.productTypes, data);
            });
    }

    function saveProductType(model) {
        var url;
        if (model.productTypeId === 0) {
            url = "/api/quarry/producttypeadd";
        }
        else {
            url = "/api/quarry/producttypeupdate";
        }

        return $http.post(url, model);
    }

    function deleteProductType(productTypeId) {
        return $http.post("/api/quarry/producttypedelete", productTypeId);
    }

    //Quarry
    function getQuarries() {
        return $http.get("/api/quarry/quarriesget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.quarries.splice(0, service.quarries.length);
                angular.extend(service.quarries, data);
            });
    }

    function saveQuarry(model) {
        var url;
        if (model.quarryId === 0) {
            url = "/api/quarry/quarryadd";
        }
        else {
            url = "/api/quarry/quarryupdate";
        }

        return $http.post(url, model);
    }

    function deleteQuarry(quarryId) {
        return $http.post("/api/quarry/quarrydelete", quarryId);
    }

    //Yards
    function getYards() {
        return $http.get("/api/quarry/yardsget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.yards.splice(0, service.yards.length);
                angular.extend(service.yards, data);
            });
    }

    function getGroupYards() {
        return $http.get("/api/quarry/groupyardsget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.groupYards.splice(0, service.groupYards.length);
                angular.extend(service.groupYards, data);
            });
    }
    

    function saveYard(model) {
        var url;
        if (model.yardId === 0) {
            url = "/api/quarry/yardadd";
        }
        else {
            url = "/api/quarry/yardupdate";
        }

        return $http.post(url, model);
    }

    function deleteYard(yardId) {
        return $http.post("/api/quarry/yarddelete", yardId);
    }


    //material
    function getMaterialViewModel() {
        return $http.get("/api/quarry/materialviewmodelget")
            .then(function (data) {
                angular.extend(service.materialViewModel, data);
            });
    }
    function saveMaterial(models) {
        return $http.post("/api/quarry/materialsave", models);
    }

    //stock & material movement
    function getStock(yardId) {
        return $http.get("/api/quarry/stockget", { params: { "yardId": yardId } })
            .then(function (data) {
                service.stock.splice(0, service.stock.length);
                angular.extend(service.stock, data);
                return data;
            });
    }

    function moveMaterial(model) {
        return $http.post("/api/quarry/movematerial", model)
            .then(function (data) {
                service.stock.splice(0, service.stock.length);
                angular.extend(service.stock, data);
            });
    }

    function materialUpdate(model) {
        return $http.post("/api/quarry/materialupdate", model, { params: { "yardId": model.currentYardId } })
                .then(function (data) {
                    service.stock.splice(0, service.stock.length);
                    angular.extend(service.stock, data);
                    return data;
                });
    }

    function materialDelete(materialId, yardId) {
        return $http.post("/api/quarry/materialdelete", null, { params: { "materialId": materialId, "yardId": yardId } })
                .then(function (data) {
                    service.stock.splice(0, service.stock.length);
                    angular.extend(service.stock, data);
                    return data;
                });
    }

    //reports
    function quarrySummaryGet(searchParams) {
        return $http.post("/api/quarry/quarrysummary", searchParams)
            .then(function (data) {
                service.quarrySummary.splice(0, service.quarrySummary.length);
                if(data !== "")
                    angular.extend(service.quarrySummary, JSON.parse(data));
                return data;
            });
    }

    function getQuarrySummaryDetails(searchParams) {
        return $http.post("/api/quarry/quarrysummarydetails", searchParams)
            .then(function (data) {
                service.quarrySummaryDetails.splice(0, service.quarrySummaryDetails.length);
                angular.extend(service.quarrySummaryDetails, data);
                return data;
            });
    }

    function productSummaryGet() {
        //productSummaryVM
        return $http.get("/api/quarry/productsummary")
            .then(function (data) {
                service.productSummaryVM.quarries = data.quarries;
                service.productSummaryVM.productTypes = data.productTypes;

                service.productSummary.splice(0, service.productSummary.length);
                angular.extend(service.productSummary, data.summary);
                return data;
            });
    }

    function productSummarySearch(searchParams) {
        return $http.post("/api/quarry/productsummarysearch", searchParams)
            .then(function (data) {
                service.productSummary.splice(0, service.productSummary.length);
                angular.extend(service.productSummary, data);
                return data;
            });
    }

    function getProductSummaryDetails(searchParams) {
        return $http.post("/api/quarry/productsummarydetails", searchParams)
            .then(function (data) {
                service.productSummaryDetails.splice(0, service.productSummaryDetails.length);
                angular.extend(service.productSummaryDetails, data);
                return data;
            });
    }

}