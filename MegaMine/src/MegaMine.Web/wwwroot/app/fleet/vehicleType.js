'use strict';
angular.module('megamine').controller('vehicleType', vehicleType)
vehicleType.$inject = ['$scope', 'vehicleService', "MegaMine.Shared.GridUtility", "MegaMine.Shared.Constants", "MegaMine.Shared.DialogService", "MegaMine.Shared.Template"];

function vehicleType($scope, vehicleService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'vehicleTypeName', field: 'vehicleTypeName', displayName: 'Vehicle Type', type: 'string' },
                    { name: 'vehicleTypeDescription', field: 'vehicleTypeDescription', type: 'string', displayName: 'Description' },
                    template.getButtonDefaultColumnDefs('vehicleTypeId', 'Fleet:VehicleTypeEdit')
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
        gridUtility.initializeGrid(vm.gridOptions, $scope, vehicleService.vehicleTypes);
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

