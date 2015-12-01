'use strict';
angular.module('megamine').controller('driver', driver)
driver.$inject = ['$scope', 'vehicleService', 'gridUtility', 'constants', 'dialogService', 'template'];

function driver($scope, vehicleService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'driverName', field: 'driverName', displayName: 'Name', type: 'string', enableHiding: false },
                    { name: 'contact', field: 'contact', displayName: 'Contact', type: 'string', enableHiding: false },
                    template.getButtonDefaultColumnDefs('vehicleDriverId', 'Fleet', 'DriverEdit')
                    ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addDriver: addDriver
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm.gridOptions, $scope, vehicleService.drivers);
    }

    function addDriver(ev) {
        var model = { vehicleDriverId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'driver_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            vehicleService.saveDriver(dialogModel).then(function () {
                //update the grid values
                if (dialogModel.vehicleDriverId === 0) {
                    vehicleService.getDrivers();
                }
                else {
                    model.driverName = dialogModel.driverName
                    model.contact = dialogModel.contact
                }

                dialogService.hide();
            });
        });
    }
}

