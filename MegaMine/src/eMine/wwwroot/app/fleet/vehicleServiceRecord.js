'use strict';
angular.module('megamine').controller('vehicleServiceRecord', vehicleServiceRecord)
vehicleServiceRecord.$inject = ['$scope', 'vehicleService', 'gridUtility', 'constants', 'dialogService', 'template', 'message'];

function vehicleServiceRecord($scope, vehicleService, gridUtility, constants, dialogService, template, message) {
    var gridOptions = {
        columnDefs: [
                    { name: 'serviceDate', field: 'serviceDate', displayName: 'Service Date', type: 'date', cellFilter: 'date:"' + constants.dateFormat + '"' },
                    { name: 'compliant', field: 'compliant', displayName: 'Compliant', type: 'string' },
                    { name: 'totalServiceCost', field: 'totalServiceCost', displayName: 'Service Cost', type: 'number' },
                    template.getButtonDefaultColumnDefs('vehicleServiceId', 'Fleet:VehicleServiceEdit')
        ]
    };

    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addService: addService
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeSubGrid(vm.gridOptions, $scope, vehicleService.vehicle.serviceRecord);
    }

    function addService(ev) {
        var model = { vehicleServiceId: 0, vehicleId: vehicleService.vehicle.vehicleId }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'service_record_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            vehicleService.saveVehicleService(dialogModel).then(function () {
                dialogService.hide();
            });
        });
    }
}
