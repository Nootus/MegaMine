'use strict';
angular.module('emine').controller('yard', yard)
yard.$inject = ['$scope', 'quarryService', 'yardDialog', 'utility'];

function yard($scope, quarryService, yardDialog, utility) {

    var gridOptions = {
        columnDefs: [
                    { name: 'yardName', field: 'yardName', displayName: 'Name', type: 'string', enableHiding: false },
                    { name: 'location', field: 'location', type: 'string', displayName: 'Location', enableHiding: false },
                    {
                        name: 'yardId', field: 'yardId', displayName: '', enableColumnMenu: false, type: 'string',
                        cellTemplate: "<span ng-hide=\"{{row.entity.quarryId !== null}}\"><md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\" module=\"Quarry\" claim=\"YardEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</md-button><span>",
                        cellClass: "text-center", enableHiding: false
                    },
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
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        yardDialog.viewDialog(model, editMode, ev);
    }
}

