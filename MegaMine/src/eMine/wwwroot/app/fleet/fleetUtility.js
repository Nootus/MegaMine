'use strict'

angular.module('megamine').factory('fleetUtility', fleetUtility);
fleetUtility.$inject = ['$rootScope'];

function fleetUtility($rootScope) {
    var vm = {
        watchManufacturerModel: watchManufacturerModel,
        manufacturerModelLists: {}
    }

    return vm;

    function watchManufacturerModel(model) {
        vm.manufacturerModelLists = model;
        $rootScope.$watch(function () {
            return model.vehicleManufacturerId;
        }, bindModelDropDown);
    }

    function bindModelDropDown(manufacturerId, oldmanufacturerId) {
        if (vm.manufacturerModelLists.modelList === undefined) {
            vm.manufacturerModelLists.modelList = [];
        }

        var modelList = vm.manufacturerModelLists.modelList;
        var vehicleModelList = vm.manufacturerModelLists.vehicleModelList;
        if (vehicleModelList === undefined)
            return;

        modelList.splice(0, modelList.length);

        for (var counter = 0; counter < vehicleModelList.length; counter++) {
            if (vehicleModelList[counter].vehicleManufacturerId === manufacturerId) {
                modelList.push({ key: vehicleModelList[counter].vehicleModelId, item: vehicleModelList[counter].name })
            }
        }

        if (manufacturerId === oldmanufacturerId)
            return;

        if (modelList.length > 0) {
            vm.manufacturerModelLists.vehicleModelId = modelList[0].key;
        }
        else {
            vm.manufacturerModelLists.vehicleModelId = undefined;
        }
    }

}