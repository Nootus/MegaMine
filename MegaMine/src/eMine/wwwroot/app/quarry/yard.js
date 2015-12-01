'use strict';
angular.module('megamine').controller('yard', yard)
yard.$inject = ['$scope', 'quarryService', 'gridUtility', 'constants', 'dialogService', 'template'];

function yard($scope, quarryService, gridUtility, constants, dialogService, template) {

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
        gridUtility.initializeGrid(vm.gridOptions, $scope, quarryService.yards);
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
            quarryService.saveYard(dialogModel).then(function () {
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

