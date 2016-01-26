﻿'use strict';
angular.module('megamine').controller('yard', yard)
yard.$inject = ['$scope', 'quarryService', 'gridUtility', 'constants', 'dialogService', 'template'];

function yard($scope, quarryService, gridUtility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                        { name: 'yardName', field: 'yardName', displayName: 'Name', type: 'string' },
                        { name: 'location', field: 'location', type: 'string', displayName: 'Location' },
                        template.getButtonDefaultColumnDefs('yardId', 'Quarry:YardEdit,Plant:YardEdit', 'Quarry:YardDelete,Plant:YardDelete', 'row.entity.quarryId !== null')
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
            if (dialogMode === constants.enum.buttonType.delete) {
                quarryService.deleteYard(dialogModel.yardId).then(function () {
                    quarryService.getYards();
                    dialogService.hide();
                });
            }
            else {
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
            }
        });
    }
}

