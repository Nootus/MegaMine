'use strict';
angular.module('emine').controller('manufacturerList', manufacturerList)
manufacturerList.$inject = ['$scope', 'vehicleService', 'manufacturerDialog', 'gridUtility', 'navigation', 'constants', 'template'];

function manufacturerList($scope, vehicleService, manufacturerDialog, gridUtility, navigation, constants, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Name', type: 'string', enableHiding: false },
                    { name: 'description', field: 'description', displayName: 'Description', type: 'string', enableHiding: false },
                    template.getButtonColumnDefs('vehicleManufacturerId', [{ buttonType: constants.enum.buttonType.view, ngClick: 'grid.appScope.vm.navigateToManufacturer(row.entity)' }])
                    ]
    };


    var vm = {
        gridOptions: gridOptions,
        navigateToManufacturer: navigateToManufacturer,
        addManufacturer: addManufacturer,
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm.gridOptions, $scope, vehicleService.manufacturerList);
    }

    function navigateToManufacturer(row) {
        navigation.gotomanufacturer(row.vehicleManufacturerId);
    }

    function addManufacturer(ev)
    {
        var model = { vehicleManufacturerId: 0 }
        manufacturerDialog.viewDialog(model, constants.enum.dialogMode.save, ev);
    }
}
