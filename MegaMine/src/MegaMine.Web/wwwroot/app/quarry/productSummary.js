'use strict';
angular.module('megamine').controller('productSummary', productSummary)
productSummary.$inject = ['$scope', 'quarryService', 'gridUtility', 'quarryUtility', 'dialogService', 'constants', 'template'];

function productSummary($scope, quarryService, gridUtility, quarryUtility, dialogService, constants, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'productTypeName', field: 'productTypeName', displayName: 'Product Type', type: 'string' },
                    { name: 'quarryName', field: 'quarryName', displayName: 'Quarry Name', type: 'string' },
                    { name: 'materialCount', field: 'materialCount', type: 'int', displayName: 'Total' },
                    , template.getButtonColumnDefs('rowId', [{ buttonType: constants.enum.buttonType.view, ngClick: 'grid.appScope.vm.showSummaryDetails(row.entity, $event)' }])
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
        quarries: undefined,
        selectedQuarries: [],
        productTypes: undefined,
        selectedProductTypes: [],
        summary: [],
        gridOptions: gridOptions,
        dialogVm: { gridOptions: dialogGridOptions },
        searchParams: { startDate: undefined, endDate: undefined },
        getSummary: getSummary,
        showSummaryDetails: showSummaryDetails,

    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm.gridOptions, $scope, quarryService.productSummary);
        vm.quarries = quarryService.productSummaryVM.quarries;
        vm.productTypes = quarryService.productSummaryVM.productTypes;
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
            quarryService.productSummarySearch(vm.searchParams);
        }
    }

    function dialogInit(dialogScope, dialogModel) {
        gridUtility.initializeDialogGrid(dialogGridOptions, dialogScope, dialogModel);
    }

    function showSummaryDetails(summaryModel, ev) {
        vm.searchParams.quarryIds = [ summaryModel.quarryId ];
        vm.searchParams.productTypeIds = [ summaryModel.productTypeId ];
        dialogService.show({
            templateUrl: 'product_summary_dialog',
            targetEvent: ev,
            data: { summaryModel: summaryModel, model: quarryService.productSummaryDetails, gridOptions: dialogGridOptions },
            dialogMode: constants.enum.dialogMode.view,
            dialogInit: dialogInit,
            resolve: { resolvemodel: function () { return quarryService.getProductSummaryDetails(vm.searchParams) } }
        })
    }
}

