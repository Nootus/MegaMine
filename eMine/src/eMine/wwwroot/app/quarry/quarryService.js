'use strict'

angular.module('emine').factory('quarryService', quarryService);

quarryService.$inject = ['$http'];

function quarryService($http) {

    var service = {
        //colours
        colours: [],
        getMaterialColours: getMaterialColours,
        saveMaterialColour: saveMaterialColour
    };

    return service;

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

}