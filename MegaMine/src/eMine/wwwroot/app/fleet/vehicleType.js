'use strict';
angular.module('emine').controller('vehicleType', vehicleType)
vehicleType.$inject = ['$scope', 'vehicleService', 'gridUtility', 'constants', 'dialogService', 'template'];

function vehicleType($scope, vehicleService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'vehicleTypeName', field: 'vehicleTypeName', displayName: 'Vehicle Type', type: 'string', enableHiding: false },
                    { name: 'vehicleTypeDescription', field: 'vehicleTypeDescription', type: 'string', displayName: 'Description', enableHiding: false },
                    template.getButtonDefaultColumnDefs('vehicleTypeId', 'Fleet', 'VehicleTypeEdit')
                    ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addVehicleType: addVehicleType
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm, $scope, vehicleService.vehicleTypes);
    }

    function addVehicleType(ev) {
        var model = { vehicleTypeId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'vehicle_type_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            vehicleService.saveVehicleType(dialogModel).then(function () {
                //update the grid values
                if (dialogModel.vehicleTypeId === 0) {
                    vehicleService.getVehicleType();
                }
                else {
                    model.vehicleTypeName = dialogModel.vehicleTypeName
                    model.vehicleTypeDescription = dialogModel.vehicleTypeDescription
                }

                dialogService.hide();
            });
        });
    }
}

