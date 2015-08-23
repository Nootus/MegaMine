'use strict';
angular.module('emine').controller('quarry', quarry)
quarry.$inject = ['$scope', 'quarryService', 'quarryDialog', 'utility', 'dialogService'];

function quarry($scope, quarryService, quarryDialog, utility, dialogService) {

    var gridOptions = {
        columnDefs: [
                    { name: 'quarryName', field: 'quarryName', displayName: 'Name', type: 'string', enableHiding: false },
                    { name: 'colour', field: 'colours', type: 'string', displayName: 'Colour', enableHiding: false },
                    { name: 'location', field: 'location', type: 'string', displayName: 'Location', enableHiding: false },
                    {
                        name: 'quarryId', field: 'quarryId', displayName: '', enableColumnMenu: false, type: 'string',
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, 0, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, 1, $event)\" module=\"Quarry\" claim=\"QuarryEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</md-button>",
                        cellClass: "text-center", enableHiding: false
                    },
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addQuarry: addQuarry
    };

    init();

    return vm;

    function init() {
        utility.initializeGrid(vm, $scope, quarryService.quarries);
    }

    function addQuarry(ev) {
        var model = { quarryId: 0 }
        viewDialog(model, 1, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        //quarryDialog.viewDialog(model, editMode, ev);
        dialogService.showDialog({
            templateUrl: '/app/quarry/quarryDialog.html',
            targetEvent: ev,
            data: { model: model, service: quarryService },
            dialogMode: dialogMode
        });
    }
}

