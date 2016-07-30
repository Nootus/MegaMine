'use strict';
angular.module('megamine').controller('vehicleList', vehicleList)
vehicleList.$inject = ['$scope', 'vehicleService', 'vehicleDialog', 'gridUtility', "MegaMine.Shared.Navigation", "MegaMine.Shared.Constants", "MegaMine.Shared.Template"];

function vehicleList($scope, vehicleService, vehicleDialog, gridUtility, navigation, constants, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'registrationNumber', field: 'registrationNumber', displayName: 'Registration #', type:'string' },
                    { name: 'vehicleType', field: 'vehicleType', displayName: 'Type', type: 'string' },
                    { name: 'vehicleModel', field: 'vehicleModel', displayName: 'Model', type: 'string' },
                    { name: 'lastServiceDate', field: 'lastServiceDate', displayName: 'Service Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'fuelAverage', field: 'fuelAverage', displayName: 'Fuel Average', type: 'number' },
                    { name: 'driver', field: 'driver', displayName: 'Driver', type: 'string' },
                    template.getButtonColumnDefs('vehicleId', [{ buttonType: constants.enum.buttonType.view, ngClick: 'grid.appScope.vm.navigateToVehicle(row.entity)' }])
                    ]
    };


    var vm = {
        gridOptions: gridOptions,
        navigateToVehicle: navigateToVehicle,
        addVehicle: addVehicle,
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm.gridOptions, $scope, vehicleService.vehicleList);
    }

    function navigateToVehicle(row) {
        navigation.gotoVehicle(row.vehicleId);
    }

    function addVehicle(ev) {
        var model = { vehicleId: 0 }
        vehicleDialog.viewDialog(model, constants.enum.dialogMode.save, ev);
    }
}
