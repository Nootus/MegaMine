'use strict';
angular.module('emine').controller('sparePartList', sparePartList)
sparePartList.$inject = ['$rootScope', '$scope', 'vehicleService', 'sparePartDialog', 'utility', 'navigation', 'constants', 'template'];

function sparePartList($rootScope, $scope, vehicleService, sparePartDialog, utility, navigation, constants, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Part Name', type: 'string', enableHiding: false },
                    { name: 'description', field: 'description', displayName: 'Description', type: 'string', enableHiding: false },
                    { name: 'quantity', field: 'quantity', displayName: 'Available Quantity', type: 'number', enableHiding: false },
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
        utility.initializeGrid(vm, $scope, vehicleService.sparePartList);
    }

    function navigateToSparePart(row) {
        navigation.gotoSparePart(row.sparePartId);
    }

    function addSparePart(ev, editMode)
    {
        var model = { sparePartId: 0 }
        sparePartDialog.viewDialog($rootScope, model, constants.enum.dialogMode.save, ev);
    }
}
