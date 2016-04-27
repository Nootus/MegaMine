'use strict';
angular.module('megamine').controller('quarrySummary', quarrySummary)
quarrySummary.$inject = ['quarryService', 'quarryUtility', 'dialogService', 'constants', 'template'];

function quarrySummary(quarryService, quarryUtility, dialogService, constants, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'QuarryName', field: 'QuarryName', displayName: 'Quarry Name', type: 'string' },
                    { name: 'Colour', field: 'Colours', type: 'string', displayName: 'Colour' },
       ]
    };

    var dialogGridOptions = {
        columnDefs: [
                    { name: 'blockNumber', field: 'blockNumber', displayName: 'Block Number', type: 'string' },
                    { name: 'productType', field: 'productType', displayName: 'Product Type', type: 'string' },
                    { name: 'colour', field: 'materialColour', type: 'string', displayName: 'Colour' },
                    { name: 'length', field: 'length', type: 'number', displayName: 'Length' },
                    { name: 'width', field: 'width', type: 'number', displayName: 'Width' },
                    { name: 'height', field: 'height', type: 'number', displayName: 'Height' },
                    { name: 'weight', field: 'weight', type: 'number', displayName: 'Weight' },
                    { name: 'materialDate', field: 'materialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'quarry', field: 'quarry', type: 'string', displayName: 'Quarry' }
        ]
    };


    var vm = {
        grid: {
            options: gridOptions,
            data: quarryService.quarrySummary,
            showQuarrySummaryDetails: showQuarrySummaryDetails
        },
        dialogGrid: { options: dialogGridOptions },
        searchParams: { startDate: undefined, endDate: undefined, quarryId: 0 },
        getQuarrySummary: getQuarrySummary,
    };

    init();

    return vm;

    function init() {
        var productTypes = quarryUtility.sortProductTypeByFormula(quarryService.productTypeList);
        angular.forEach(productTypes, function (item) {
            vm.grid.options.columnDefs.push({ name: item.productTypeName, field: item.productTypeName, type: 'number', displayName: item.productTypeName });
        });
        vm.grid.options.columnDefs.push({ name: 'Total', field: 'Total', type: 'number', displayName: 'Total' });
        vm.grid.options.columnDefs.push(template.getButtonColumnDefs('QuarryId', [{ buttonType: constants.enum.buttonType.view, ngClick: 'grid.appScope.grid.showQuarrySummaryDetails(row.entity, $event)' }]));
    }

    function getQuarrySummary(form) {
        if (form.$valid) {
            quarryService.quarrySummaryGet(vm.searchParams);
        }
    }

    function dialogInit(dialogScope, dialogModel) {
        dialogScope.dialogGrid.data = dialogModel;
    }

    function showQuarrySummaryDetails(quarry, ev) {
        vm.searchParams.quarryId = quarry.QuarryId

        dialogService.show({
            templateUrl: 'quarry_summary_dialog',
            targetEvent: ev,
            data: { quarryModel: quarry, model: quarryService.quarrySummaryDetails, dialogGrid: vm.dialogGrid},
            dialogMode: constants.enum.dialogMode.view,
            dialogInit: dialogInit,
            resolve: { resolvemodel: function () { return quarryService.getQuarrySummaryDetails(vm.searchParams) } }
        })
    }
}

