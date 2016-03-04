'use strict';
angular.module('megamine').controller('dressing', dressing)
dressing.$inject = ['$scope', '$mdDialog', 'plantService', 'gridUtility', 'constants', 'message'];

function dressing($scope, $mdDialog, plantService, gridUtility, constants, message) {
    var vm = {
        dressingModel: {},
    }
    init();

    return vm;

    function init() {
        vm.dressingModel = plantService.dressingModel;
    }
}