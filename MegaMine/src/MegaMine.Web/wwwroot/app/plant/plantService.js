'use strict'

angular.module('megamine').factory('plantService', plantService);

plantService.$inject = ['$http'];

function plantService($http) {

    var service = {
        //machine
        machines: [],
        machinesGet: machinesGet,
        machineSave: machineSave,
        machineDelete: machineDelete,

        //blade
        blades: [],
        bladesGet: bladesGet,
        bladeSave: bladeSave,
        bladeDelete: bladeDelete,

        //operator
        operators: [],
        operatorsGet: operatorsGet,
        operatorSave: operatorSave,
        operatorDelete: operatorDelete,
    };

    return service;

    //Machine
    function machinesGet() {
        return $http.get("/api/plant/machinesget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.machines.splice(0, service.machines.length);
                angular.extend(service.machines, data);
            });
    }

    function machineSave(model) {
        var url;
        if (model.machineId === 0) {
            url = "/api/plant/machineadd";
        }
        else {
            url = "/api/plant/machineupdate";
        }

        return $http.post(url, model);
    }

    function machineDelete(machineId) {
        return $http.post("/api/plant/machinedelete", machineId);
    }

    //blade
    function bladesGet() {
        return $http.get("/api/plant/bladesget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.blades.splice(0, service.blades.length);
                angular.extend(service.blades, data);
            });
    }

    function bladeSave(model) {
        var url;
        if (model.bladeId === 0) {
            url = "/api/plant/bladeadd";
        }
        else {
            url = "/api/plant/bladeupdate";
        }

        return $http.post(url, model);
    }

    function bladeDelete(bladeId) {
        return $http.post("/api/plant/bladedelete", bladeId);
    }

    //operator
    function operatorsGet() {
        return $http.get("/api/plant/operatorsget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.operators.splice(0, service.operators.length);
                angular.extend(service.operators, data);
            });
    }

    function operatorSave(model) {
        var url;
        if (model.operatorId === 0) {
            url = "/api/plant/operatoradd";
        }
        else {
            url = "/api/plant/operatorupdate";
        }

        return $http.post(url, model);
    }

    function operatorDelete(operatorId) {
        return $http.post("/api/plant/operatordelete", operatorId);
    }
}