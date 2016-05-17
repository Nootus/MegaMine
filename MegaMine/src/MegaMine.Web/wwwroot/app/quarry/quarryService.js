'use strict'

angular.module('megamine').factory('quarryService', quarryService);

quarryService.$inject = ['$http', 'utility'];

function quarryService($http, utility) {

    var service = {
        //colours
        colours: { list: [], widgets: {} },
        colourListItems: [],
        getMaterialColours: getMaterialColours,
        getMaterialColourListItems: getMaterialColourListItems,
        saveMaterialColour: saveMaterialColour,
        deleteMaterialColour: deleteMaterialColour,

        //product types
        productTypes: { list: [], widgets: {}},
        productTypeList: [],
        getProductTypes: getProductTypes,
        getProductTypeList: getProductTypeList,
        saveProductType: saveProductType,
        deleteProductType: deleteProductType,

        //quarries
        quarries: { list: [], widgets: {}},
        getQuarries: getQuarries,
        saveQuarry: saveQuarry,
        deleteQuarry: deleteQuarry,

        //yards
        yards: { list: [], widgets: {} },
        yardList: [],
        groupYards: [],
        getYardList: getYardList,
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
                utility.extend(service.colours.list, data.model);
                angular.extend(service.colours.widgets, data.dashboard);
            });
    }
    function getMaterialColourListItems() {
        return $http.get("/api/quarry/materialcolourlistitemsget")
            .then(function (data) {
                utility.extend(service.colourListItems, data);
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
                utility.extend(service.productTypes.list, data.model);
                angular.extend(service.productTypes.widgets, data.dashboard);
            });
    }

    function getProductTypeList() {
        return $http.get("/api/quarry/producttypelistget")
            .then(function (data) {
                utility.extend(service.productTypeList, data);
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
                utility.extend(service.quarries.list, data.model);
                angular.extend(service.quarries.widgets, data.dashboard);
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
    function getYardList() {
        return $http.get("/api/quarry/yardlistget")
            .then(function (data) {
                utility.extend(service.yardList, data);
            });
    }

    function getYards() {
        return $http.get("/api/quarry/yardsget")
            .then(function (data) {
                utility.extend(service.yards.list, data.model);
                angular.extend(service.yards.widgets, data.dashboard);
            });
    }

    function getGroupYards() {
        return $http.get("/api/quarry/groupyardsget")
            .then(function (data) {
                utility.extend(service.groupYards, data);
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
                utility.extend(service.stock, data);
                return data;
            });
    }

    function moveMaterial(model) {
        return $http.post("/api/quarry/movematerial", model)
            .then(function (data) {
                utility.extend(service.stock, data);
            });
    }

    function materialUpdate(model) {
        return $http.post("/api/quarry/materialupdate", model, { params: { "yardId": model.currentYardId } })
                .then(function (data) {
                    utility.extend(service.stock, data);
                    return data;
                });
    }

    function materialDelete(materialId, yardId) {
        return $http.post("/api/quarry/materialdelete", null, { params: { "materialId": materialId, "yardId": yardId } })
                .then(function (data) {
                    utility.extend(service.stock, data);
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
                utility.extend(service.quarrySummaryDetails, data);
                return data;
            });
    }

    function productSummaryGet() {
        //productSummaryVM
        return $http.get("/api/quarry/productsummary")
            .then(function (data) {
                service.productSummaryVM.quarries = data.quarries;
                service.productSummaryVM.productTypes = data.productTypes;

                utility.extend(service.productSummary, data);
                return data;
            });
    }

    function productSummarySearch(searchParams) {
        return $http.post("/api/quarry/productsummarysearch", searchParams)
            .then(function (data) {
                utility.extend(service.productSummary, data);
                return data;
            });
    }

    function getProductSummaryDetails(searchParams) {
        return $http.post("/api/quarry/productsummarydetails", searchParams)
            .then(function (data) {
                utility.extend(service.productSummaryDetails, data);
                return data;
            });
    }

}