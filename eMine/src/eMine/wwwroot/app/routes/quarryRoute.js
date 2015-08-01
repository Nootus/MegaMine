'use strict';

angular.module('emine').config(quarryRoute);
quarryRoute.$inject = ['$stateProvider'];

function quarryRoute($stateProvider) {

    $stateProvider
        .state("colour", {
            url: window.virtualDirectory + "/colour",
            title: "Product Colour",
            previousState: "dashboard",
            templateUrl: "/app/quarry/materialColour.html",
            controller: "materialColour",
            controllerAs: "vm",
            resolve: ['quarryService', function (quarryService) {
                return quarryService.getMaterialColours();
            }]
        })
        .state("producttype", {
            url: window.virtualDirectory + "/producttype",
            title: "Product Type",
            previousState: "dashboard",
            templateUrl: "/app/quarry/productType.html",
            controller: "productType",
            controllerAs: "vm",
            resolve: ['quarryService', function (quarryService) {
                return quarryService.getProductTypes();
            }]
        })

}
