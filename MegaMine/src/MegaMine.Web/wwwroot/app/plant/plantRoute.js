'use strict';

angular.module('megamine').config(plantRoute);
plantRoute.$inject = ['$stateProvider'];

function plantRoute($stateProvider) {

    $stateProvider
        .state("dressing", {
            url: window.virtualDirectory + "/dressing",
            title: "Machine",
            previousState: "dashboard",
            templateUrl: "/app/plant/dressing.html",
            controller: "dressing",
            controllerAs: "vm",
            resolve: {
                resolveModel: ['plantService', function (plantService) {
                    return plantService.machinesGet();
                }]
            }
        })
        .state("machine", {
            url: window.virtualDirectory + "/machine",
            title: "Machine",
            previousState: "dashboard",
            templateUrl: "/app/plant/machine.html",
            controller: "machine",
            controllerAs: "vm",
            resolve: {
                resolveModel: ['plantService', function (plantService) {
                    return plantService.machinesGet();
                }]
            }
        })
        .state("blade", {
            url: window.virtualDirectory + "/blade",
            title: "Balde",
            previousState: "dashboard",
            templateUrl: "/app/plant/blade.html",
            controller: "blade",
            controllerAs: "vm",
            resolve: {
                resolveModel: ['plantService', function (plantService) {
                    return plantService.bladesGet();
                }]
            }
        })
        .state("operator", {
            url: window.virtualDirectory + "/operator",
            title: "Balde",
            previousState: "dashboard",
            templateUrl: "/app/plant/operator.html",
            controller: "operator",
            controllerAs: "vm",
            resolve: {
                resolveModel: ['plantService', function (plantService) {
                    return plantService.operatorsGet();
                }]
            }
        })
}
