'use strict';
angular.module('emine').controller('materialColour', materialColour)
materialColour.$inject = ['$scope', 'quarryService', 'materialColourDialog', 'utility'];

function materialColour($scope, quarryService, materialColourDialog, utility) {

    var gridOptions = {
        columnDefs: [
                    { name: 'colourName', field: 'colourName', displayName: 'Colour', type: 'string', enableHiding: false },
                    { name: 'colourDescription', field: 'colourDescription', type: 'string', displayName: 'Description', enableHiding: false },
                    {
                        name: 'materialColourId', field: 'materialColourId', displayName: '', enableColumnMenu: false, type: 'string',
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\" module=\"Quarry\" claim=\"MaterialColourEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</md-button>",
                        cellClass: "text-center", enableHiding: false
                    },
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
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        materialColourDialog.viewDialog(model, editMode, ev);
    }
}

