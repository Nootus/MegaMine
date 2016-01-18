'use strict';
angular.module('megamine').controller('materialColour', materialColour)
materialColour.$inject = ['$scope', 'quarryService', 'gridUtility', 'constants', 'dialogService', 'template'];

function materialColour($scope, quarryService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'colourName', field: 'colourName', displayName: 'Colour', type: 'string' },
                    { name: 'colourDescription', field: 'colourDescription', type: 'string', displayName: 'Description' },
                    template.getButtonDefaultColumnDefs('materialColourId', 'Quarry', 'MaterialColourEdit', 'MaterialColourDelete')
                ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addMaterialColour: addMaterialColour
    };

    init();

    return vm;

    function init() {
        gridUtility.initializeGrid(vm.gridOptions, $scope, quarryService.colours);
    }

    function addMaterialColour(ev) {
        var model = { materialColourId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'material_colour_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            if (dialogMode === constants.enum.buttonType.delete) {
                quarryService.deleteMaterialColour(dialogModel.materialColourId).then(function () {
                    quarryService.getMaterialColours();
                    dialogService.hide();
                });
            }
            else {
                quarryService.saveMaterialColour(dialogModel).then(function () {
                    //update the grid values
                    if (dialogModel.materialColourId === 0) {
                        quarryService.getMaterialColours();
                    }
                    else {
                        model.colourName = dialogModel.colourName
                        model.colourDescription = dialogModel.colourDescription
                    }

                    dialogService.hide();
                });
            }
        });
    }
}

