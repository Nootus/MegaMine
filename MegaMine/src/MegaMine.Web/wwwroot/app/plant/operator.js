'use strict';
angular.module('megamine').controller('operator', operator)
operator.$inject = ['$scope', 'plantService', 'gridUtility', 'constants', 'dialogService', 'template'];

function operator($scope, plantService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Name', type: 'string' },
                    template.getButtonDefaultColumnDefs('operatorId', 'Plant:OperatorEdit', 'Plant:OperatorDelete')
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        operatorAdd: operatorAdd
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm.gridOptions, $scope, plantService.operators);
    }

    function operatorAdd(ev) {
        var model = { operatorId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'operator_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            if (dialogMode === constants.enum.buttonType.delete) {
                plantService.operatorDelete(dialogModel.operatorId).then(function () {
                    plantService.operatorsGet();
                    dialogService.hide();
                });
            }
            else {
                plantService.operatorSave(dialogModel).then(function () {
                    //update the grid values
                    if (dialogModel.operatorId === 0) {
                        plantService.operatorsGet();
                    }
                    else {
                        model.name = dialogModel.name
                    }

                    dialogService.hide();
                });
            }
        });
    }
}

