'use strict';
angular.module('emine').controller('materialColour', materialColour)
materialColour.$inject = ['$scope', '$window', 'quarryService', 'materialColourDialog', 'uiGridConstants', 'utility'];

function materialColour($scope, $window, quarryService, materialColourDialog, uiGridConstants, utility) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'colourName', field: 'ColourName', displayName: 'Colour', type: 'string', enableHiding: false },
                    { name: 'colourDescription', field: 'ColourDescription', type: 'string', displayName: 'Description', enableHiding: false },
                    { name: 'materialColourId', field: 'MaterialColourId', displayName: '', enableColumnMenu: false, type: 'string', cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\" module=\"Quarry\" claim=\"MaterialColourEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</md-button>", cellClass: "text-center", enableHiding: false },
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        gridHeight: '0px',
        viewDialog: viewDialog,
        addMaterialColour: addMaterialColour
    };

    init();

    return vm;

    function init() {
        vm.gridOptions.data = quarryService.colours;
        resizeGrid();

        angular.element($window).bind('resize', function () {
            resizeGrid();
        });
        $scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeGrid() {
        vm.gridHeight = utility.getMainGridHeight('main-grid');
    }

    function addMaterialColour(ev) {
        var model = { MaterialColourId: 0 }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        materialColourDialog.viewDialog(model, editMode, ev);
    }
}

