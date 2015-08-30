'use strict';
angular.module('emine').controller('yard', yard)
yard.$inject = ['$scope', 'quarryService', 'utility', 'constants', 'dialogService', 'template'];

function yard($scope, quarryService, utility, constants, dialogService, template) {

    var gridOptions = {
        columnDefs: [
                    { name: 'yardName', field: 'yardName', displayName: 'Name', type: 'string', enableHiding: false },
                    { name: 'location', field: 'location', type: 'string', displayName: 'Location', enableHiding: false },
                    template.getButtonColumnDefs('yardId', true, 'Quarry', 'YardEdit')
        //{
        //                name: 'yardId', field: 'yardId', displayName: '', enableColumnMenu: false, type: 'string',
        //                cellTemplate: "<span ng-hide=\"{{row.entity.quarryId !== null}}\"><md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\" module=\"Quarry\" claim=\"YardEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</md-button><span>",
        //                cellClass: "text-center", enableHiding: false
        //            },
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
        //hiding buttons for quarries
        var buttonDef = vm.gridOptions.columnDefs[vm.gridOptions.columnDefs.length - 1];
        buttonDef.cellTemplate = '<span ng-hide="{{row.entity.quarryId !== null}}">' + buttonDef.cellTemplate + '</span>';

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

