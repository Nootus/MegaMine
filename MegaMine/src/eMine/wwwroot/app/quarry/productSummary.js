'use strict';
angular.module('megamine').controller('productSummary', productSummary)
productSummary.$inject = ['$scope', '$mdDialog', 'quarryService', 'gridUtility', 'quarryUtility', 'dialogService', 'constants', 'template'];

function productSummary($scope, $mdDialog, quarryService, gridUtility, quarryUtility, dialogService, constants, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'productTypeName', field: 'productTypeName', displayName: 'Product Type', type: 'string', enableHiding: false },
                    { name: 'quarryName', field: 'quarryName', displayName: 'Quarry Name', type: 'string', enableHiding: false },
                    { name: 'materialCount', field: 'materialCount', type: 'int', displayName: 'Total', enableHiding: false },
                    , template.getButtonColumnDefs('rowId', [{ buttonType: constants.enum.buttonType.view, ngClick: 'grid.appScope.vm.showSummaryDetails(row.entity, $event)' }])
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

