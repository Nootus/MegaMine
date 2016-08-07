'use strict';
angular.module('megamine').controller('productSummary', productSummary)
productSummary.$inject = ['$scope', "MegaMine.Quarry.QuarryService", "MegaMine.Shared.GridUtility", "MegaMine.Shared.DialogService", "MegaMine.Shared.Constants", "MegaMine.Shared.Template"];

function productSummary($scope, quarryService, gridUtility, dialogService, constants, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'productTypeName', field: 'productTypeName', displayName: 'Product Type', type: 'string' },
                    { name: 'quarryName', field: 'quarryName', displayName: 'Quarry Name', type: 'string' },
                    { name: 'colourName', field: 'colourName', displayName: 'Colour', type: 'string' },
                    { name: 'materialQuantityWeight', field: 'materialQuantityWeight', type: 'int', displayName: 'Quantity/Weight', cellClass: 'grid-text-right' },
                    , template.getButtonColumnDefs('rowId', [{ buttonType: constants.enum.buttonType.view, ngClick: 'grid.appScope.grid.showSummaryDetails(row.entity, $event)' }])
        ]
    };

    var dialogGridOptions = {
        columnDefs: [
                    { name: 'blockNumber', field: 'blockNumber', displayName: 'Block Number', type: 'string' },
                    { name: 'productType', field: 'productType', displayName: 'Product Type', type: 'string' },
                    { name: 'colour', field: 'materialColour', type: 'string', displayName: 'Colour' },
                    { name: 'length', field: 'length', type: 'number', displayName: 'Length', cellClass: 'grid-text-right' },
                    { name: 'width', field: 'width', type: 'number', displayName: 'Width', cellClass: 'grid-text-right' },
                    { name: 'height', field: 'height', type: 'number', displayName: 'Height', cellClass: 'grid-text-right' },
                    { name: 'weight', field: 'weight', type: 'number', displayName: 'Weight', cellClass: 'grid-text-right' },
                    { name: 'materialDate', field: 'materialDate', displayName: 'Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"', cellClass: 'grid-text-right' },
                    { name: 'quarry', field: 'quarry', type: 'string', displayName: 'Quarry' }
        ]
    };


    var vm = {
        quarries: undefined,
        selectedQuarries: [],
        productTypes: undefined,
        selectedProductTypes: [],
        colours: undefined,
        selectedColours: [],
        summary: [],
        grid: {
            options: gridOptions,
            data: quarryService.productSummary,
            showSummaryDetails: showSummaryDetails
        },
        dialogGrid: { options: dialogGridOptions, dialog: true },
        searchParams: { startDate: undefined, endDate: undefined },
        getSummary: getSummary,
        showSummaryDetails: showSummaryDetails,

    };

    init();

    return vm;

    function init() {
        vm.quarries = quarryService.productSummaryVM.quarries;
        vm.productTypes = quarryService.productSummaryVM.productTypes;
        vm.colours = quarryService.productSummaryVM.colours;
    }

    function getSummary(form) {
        if (form.$valid) {
            //populating the search params
            vm.searchParams.quarryIds = [];
            angular.forEach(vm.selectedQuarries, function (item) {
                vm.searchParams.quarryIds.push(item.key);
            });
            vm.searchParams.productTypeIds = [];
            angular.forEach(vm.selectedProductTypes, function (item) {
                vm.searchParams.productTypeIds.push(item.key);
            });
            vm.searchParams.materialColourIds = [];
            angular.forEach(vm.selectedColours, function (item) {
                vm.searchParams.materialColourIds.push(item.key);
            });
            quarryService.productSummarySearch(vm.searchParams);
        }
    }

    function dialogInit(dialogScope, dialogModel) {
        dialogScope.dialogGrid.data = dialogModel;
    }

    function showSummaryDetails(summaryModel, ev) {
        vm.searchParams.quarryIds = [ summaryModel.quarryId ];
        vm.searchParams.productTypeIds = [summaryModel.productTypeId];
        vm.searchParams.materialColourIds = [summaryModel.materialColourId];
        dialogService.show({
            templateUrl: 'product_summary_dialog',
            targetEvent: ev,
            data: { summaryModel: summaryModel, model: quarryService.productSummaryDetails, dialogGrid: vm.dialogGrid },
            dialogMode: constants.enum.dialogMode.view,
            dialogInit: dialogInit,
            resolve: { resolvemodel: function () { return quarryService.getProductSummaryDetails(vm.searchParams) } }
        })
    }
}

