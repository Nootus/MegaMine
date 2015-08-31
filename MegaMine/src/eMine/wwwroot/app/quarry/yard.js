'use strict';
angular.module('emine').controller('yard', yard)
yard.$inject = ['$scope', 'quarryService', 'utility', 'constants', 'dialogService', 'template'];

function yard($scope, quarryService, utility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                        { name: 'yardName', field: 'yardName', displayName: 'Name', type: 'string', enableHiding: false },
                        { name: 'location', field: 'location', type: 'string', displayName: 'Location', enableHiding: false },
                        template.getButtonDefaultColumnDefs('yardId', 'Quarry', 'YardEdit', 'row.entity.quarryId !== null')
                    ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addYard: addYard
    };

    init();

    return vm;

    function init() {
        utility.initializeGrid(vm, $scope, quarryService.yards);
    }

    function addYard(ev) {
        var model = { yardId: 0 }
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        dialogService.show({
            templateUrl: 'yard_dialog',
            targetEvent: ev,
            data: { model: model },
            dialogMode: dialogMode
        })
        .then(function (dialogModel) {
            quarryService.saveYard(dialogModel).success(function () {
                //update the grid values
                if (dialogModel.yardId === 0) {
                    quarryService.getYards();
                }
                else {
                    model.yardName = dialogModel.yardName
                    model.location = dialogModel.location
                }

                dialogService.hide();
            });
        });
    }
}

