'use strict';
angular.module('emine').controller('quarrySummary', quarrySummary)
quarrySummary.$inject = ['$scope', '$mdDialog', 'quarryService', 'gridUtility', 'quarryUtility', 'dialogService', 'template', 'message'];

function quarrySummary($scope, $mdDialog, quarryService, gridUtility, quarryUtility, dialogService, template, message) {

    var gridOptions = {
        columnDefs: [
                    { name: 'QuarryName', field: 'QuarryName', displayName: 'Quarry Name', type: 'string', enableHiding: false },
                    { name: 'Colour', field: 'Colours', type: 'string', displayName: 'Colour', enableHiding: false },
       ]
    };


    var vm = {
        summary: [],
        gridOptions: gridOptions,
        startDate: undefined,
        endDate: undefined,
        getSummary: getSummary,
    };

    init();

    return vm;

    function init() {
        var productTypes = quarryUtility.sortProductTypeByFormula(quarryService.productTypes);
        angular.forEach(productTypes, function (item) {
            vm.gridOptions.columnDefs.push({ name: item.productTypeName, field: item.productTypeName, type: 'number', displayName: item.productTypeName, enableHiding: false });
        });
        vm.gridOptions.columnDefs.push({ name: 'Total', field: 'Total', type: 'number', displayName: 'Total', enableHiding: false });
        //clearing up the previous search
        quarryService.summary.splice(0, quarryService.summary.length);
        gridUtility.initializeGrid(vm, $scope, quarryService.summary);
    }

    function getSummary(form) {
        if (form.$valid) {
            quarryService.summaryGet(vm.startDate, vm.endDate);
        }
    }
}

