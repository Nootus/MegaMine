'use strict';
angular.module('megamine').controller('blade', blade)
blade.$inject = ['$scope', 'plantService', "MegaMine.Shared.GridUtility", "MegaMine.Shared.Constants", 'dialogService', "MegaMine.Shared.Template"];

function blade($scope, plantService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Name', type: 'string' },
                    { name: 'description', field: 'description', type: 'string', displayName: 'Description' },
                    template.getButtonDefaultColumnDefs('bladeId', 'Plant:BladeEdit', 'Plant:BladeDelete')
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        bladeAdd: bladeAdd
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm.gridOptions, $scope, plantService.blades);
    }

    function bladeAdd(ev) {
        var model = { bladeId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'blade_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            if (dialogMode === constants.enum.buttonType.delete) {
                plantService.bladeDelete(dialogModel.bladeId).then(function () {
                    plantService.bladesGet();
                    dialogService.hide();
                });
            }
            else {
                plantService.bladeSave(dialogModel).then(function () {
                    //update the grid values
                    if (dialogModel.bladeId === 0) {
                        plantService.bladesGet();
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

