'use strict';
angular.module('megamine').controller('machine', machine)
machine.$inject = ['$scope', 'plantService', 'gridUtility', 'constants', 'dialogService', 'template'];

function machine($scope, plantService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Name', type: 'string' },
                    { name: 'description', field: 'description', type: 'string', displayName: 'Description' },
                    template.getButtonDefaultColumnDefs('machineId', 'Plant:MachineEdit', 'Plant:MachineDelete')
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        machineAdd: machineAdd
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm.gridOptions, $scope, plantService.machines);
    }

    function machineAdd(ev) {
        var model = { machineId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'machine_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            if (dialogMode === constants.enum.buttonType.delete) {
                plantService.machineDelete(dialogModel.machineId).then(function () {
                    plantService.machinesGet();
                    dialogService.hide();
                });
            }
            else {
                plantService.machineSave(dialogModel).then(function () {
                    //update the grid values
                    if (dialogModel.machineId === 0) {
                        plantService.machinesGet();
                    }
                    else {
                        model.name = dialogModel.name
                        model.description = dialogModel.description
                    }

                    dialogService.hide();
                });
            }
        });
    }
}

