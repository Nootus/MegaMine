'use strict';
angular.module('emine').controller('vehicleList', vehicleList)
vehicleList.$inject = ['$scope', 'vehicleService', 'vehicleDialog', 'uiGridConstants', 'utility', 'navigation', 'constants', 'template'];

function vehicleList($scope, vehicleService, vehicleDialog, uiGridConstants, utility, navigation, constants) {

    var gridOptions = {
        columnDefs: [
                    { name: 'registrationNumber', field: 'registrationNumber', displayName: 'Registration #', type:'string', enableHiding: false },
                    { name: 'vehicleType', field: 'vehicleType', displayName: 'Type', type: 'string', enableHiding: false },
                    { name: 'vehicleModel', field: 'vehicleModel', displayName: 'Model', type: 'string', enableHiding: false },
                    { name: 'lastServiceDate', field: 'lastServiceDate', displayName: 'Service Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"', enableHiding: false },
                    { name: 'fuelAverage', field: 'fuelAverage', displayName: 'Fuel Average', type: 'number', enableHiding: false },
                    { name: 'driver', field: 'driver', displayName: 'Driver', type: 'string', enableHiding: false },
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
        utility.initializeGrid(vm, $scope, vehicleService.vehicleList);
    }

    function navigateToVehicle(row) {
        navigation.gotoVehicle(row.vehicleId);
    }

    function addVehicle(ev) {
        var model = { vehicleId: 0 }
        vehicleDialog.viewDialog(model, constants.enum.dialogMode.save, ev);
    }
}
