'use strict';
angular.module('emine').controller('quarrySummary', quarrySummary)
quarrySummary.$inject = ['$scope', '$mdDialog', 'quarryService', 'gridUtility', 'quarryUtility', 'constants', 'dialogService', 'template', 'message'];

function quarrySummary($scope, $mdDialog, quarryService, gridUtility, quarryUtility, constants, dialogService, template, message) {

    var gridOptions = {
        columnDefs: [
                    { name: 'quarryName', field: 'quarryName', displayName: 'Quarry Name', type: 'string', enableHiding: false },
                    { name: 'colour', field: 'colours', type: 'string', displayName: 'Colour', enableHiding: false },
                    { name: 'slab', field: 'slab', type: 'number', displayName: 'Slab', enableHiding: false },
                    { name: 'tile', field: 'tile', type: 'number', displayName: 'Tile', enableHiding: false },
                    { name: 'reject', field: 'reject', type: 'number', displayName: 'Reject', enableHiding: false },
                    { name: 'total', field: 'total', type: 'number', displayName: 'Total', enableHiding: false },
       ]
    };


    var vm = {
        summary: [],
        gridOptions: gridOptions,
        getSummary: getSummary,
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm, $scope, quarryService.summary);
    }

    function getSummary(form) {
        if (form.$valid) {
            quarryService.summaryGet();
        }
    }
}

