'use strict';
angular.module('megamine').controller('sparePartList', sparePartList)
sparePartList.$inject = ['$scope', 'vehicleService', 'sparePartDialog', 'gridUtility', 'navigation', "MegaMine.Shared.Constants", 'template'];

function sparePartList($scope, vehicleService, sparePartDialog, gridUtility, navigation, constants, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Part Name', type: 'string' },
                    { name: 'description', field: 'description', displayName: 'Description', type: 'string' },
                    { name: 'quantity', field: 'quantity', displayName: 'Available Quantity', type: 'number' },
                    template.getButtonColumnDefs('sparePartId', [{ buttonType: constants.enum.buttonType.view, ngClick: 'grid.appScope.vm.navigateToSparePart(row.entity)' }])
                    ]
    };

    var vm = {
        gridOptions: gridOptions,
        navigateToSparePart: navigateToSparePart,
        addSparePart: addSparePart,
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm.gridOptions, $scope, vehicleService.sparePartList);
    }

    function navigateToSparePart(row) {
        navigation.gotoSparePart(row.sparePartId);
    }

    function addSparePart(ev, editMode)
    {
        var model = { sparePartId: 0 }
        sparePartDialog.viewDialog(model, constants.enum.dialogMode.save, ev);
    }
}
