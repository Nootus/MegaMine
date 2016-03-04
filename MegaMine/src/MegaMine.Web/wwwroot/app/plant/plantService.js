'use strict'

angular.module('megamine').factory('plantService', plantService);

plantService.$inject = ['$http', 'utility'];

function plantService($http, utility) {

    var service = {
        //dressing
        dressingModel: {
            model: {},
            machineStoppages: [],
            machineOperators: [],
            machines: [],
            operators: []
        },
        dressingGet: dressingGet,

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

    //dressing
    function dressingGet(machineId, processDate) {
        return $http.post("/api/plant/dressingget", { machineId: machineId, processDate: processDate })
            .then(function (data) {
                //utilit.extend(service.dressingModel.)
            });
    }

    //machine
    function machinesGet() {
        return $http.get("/api/plant/machinesget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                utility.extend(service.machines, data.machines);
                utility.extend(service.blades, data.blades);
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
                utility.extend(service.blades, data);
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
                utility.extend(service.operators, data);
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