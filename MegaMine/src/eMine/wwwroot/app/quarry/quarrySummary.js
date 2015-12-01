'use strict';
angular.module('megamine').controller('quarrySummary', quarrySummary)
quarrySummary.$inject = ['$scope', '$mdDialog', 'quarryService', 'gridUtility', 'quarryUtility', 'dialogService', 'constants', 'template'];

function quarrySummary($scope, $mdDialog, quarryService, gridUtility, quarryUtility, dialogService, constants, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'QuarryName', field: 'QuarryName', displayName: 'Quarry Name', type: 'string', enableHiding: false },
                    { name: 'Colour', field: 'Colours', type: 'string', displayName: 'Colour', enableHiding: false },
       ]
    };

    var dialogGridOptions = {
        columnDefs: [
                    { name: 'productType', field: 'productType', displayName: 'Product Type', type: 'string', enableHiding: false },
                    { name: 'colour', field: 'materialColour', type: 'string', displayName: 'Colour', enableHiding: false },
                    { name: 'length', field: 'length', type: 'number', displayName: 'Length', enableHiding: false },
                    { name: 'width', field: 'width', type: 'number', displayName: 'Width', enableHiding: false },
                    { name: 'height', field: 'height', type: 'number', displayName: 'Height', enableHiding: false },
                    { name: 'weight', field: 'weight', type: 'number', displayName: 'Weight', enableHiding: false },
                    { name: 'materialDate', field: 'materialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quarry', field: 'quarry', type: 'string', displayName: 'Quarry', enableHiding: false }
        ]
    };


    var vm = {
        quarrySummary: [],
        gridOptions: gridOptions,
        searchParams: { startDate: undefined, endDate: undefined, quarryId: 0 },
        getQuarrySummary: getQuarrySummary,
        showQuarrySummaryDetails: showQuarrySummaryDetails
    };

    init();

    return vm;

    function init() {
        var productTypes = quarryUtility.sortProductTypeByFormula(quarryService.productTypes);
        angular.forEach(productTypes, function (item) {
            vm.gridOptions.columnDefs.push({ name: item.productTypeName, field: item.productTypeName, type: 'number', displayName: item.productTypeName, enableHiding: false });
        });
        vm.gridOptions.columnDefs.push({ name: 'Total', field: 'Total', type: 'number', displayName: 'Total', enableHiding: false });
        vm.gridOptions.columnDefs.push(template.getButtonColumnDefs('QuarryId', [{ buttonType: constants.enum.buttonType.view, ngClick: 'grid.appScope.vm.showQuarrySummaryDetails(row.entity, $event)' }]));

        //clearing up the previous search
        gridUtility.initializeGrid(vm.gridOptions, $scope, quarryService.quarrySummary);
    }

    function getQuarrySummary(form) {
        if (form.$valid) {
            quarryService.quarrySummaryGet(vm.searchParams);
        }
    }

    function dialogInit(dialogScope, dialogModel) {
        gridUtility.initializeDialogGrid(dialogGridOptions, dialogScope, dialogModel);
    }

    function showQuarrySummaryDetails(quarry, ev) {
        vm.searchParams.quarryId = quarry.QuarryId
        dialogService.show({
            templateUrl: 'quarry_summary_dialog',
            targetEvent: ev,
            data: { quarryModel: quarry, model: quarryService.quarrySummaryDetails, gridOptions: dialogGridOptions },
            dialogMode: constants.enum.dialogMode.view,
            dialogInit: dialogInit,
            resolve: { resolvemodel: function () { return quarryService.getQuarrySummaryDetails(vm.searchParams) } }
        })
    }
}

