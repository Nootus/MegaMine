'use strict';
angular.module('emine').controller('manufacturerList', manufacturerList)
manufacturerList.$inject = ['$scope', 'vehicleService', 'utility', 'navigation', 'constants', 'dialogService', 'template'];

function manufacturerList($scope, vehicleService, utility, navigation, constants, dialogService, template) {

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
        utility.initializeGrid(vm, $scope, vehicleService.manufacturerList);
    }

    function navigateToManufacturer(row) {
        navigation.gotomanufacturer(row.vehicleManufacturerId);
    }

    function addManufacturer(ev)
    {
        var model = { vehicleManufacturerId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: utility.virtualDirectory + '/app/fleet/manufacturerDialog.html',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            vehicleService.saveManufacturer(dialogModel).then(function () {
                vehicleService.getManufacturerList();
                dialogService.hide();
            });
        });
    }

}
