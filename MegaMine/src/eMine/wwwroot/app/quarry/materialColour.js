'use strict';
angular.module('emine').controller('materialColour', materialColour)
materialColour.$inject = ['$scope', 'quarryService', 'utility', 'constants', 'dialogService', 'template'];

function materialColour($scope, quarryService, utility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'colourName', field: 'colourName', displayName: 'Colour', type: 'string', enableHiding: false },
                    { name: 'colourDescription', field: 'colourDescription', type: 'string', displayName: 'Description', enableHiding: false },
                    template.getButtonColumnDefs('materialColourId', true, 'Quarry', 'MaterialColourEdit')
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
        utility.initializeGrid(vm, $scope, quarryService.colours);
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
            quarryService.saveMaterialColour(dialogModel).success(function () {
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
        });
    }
}

