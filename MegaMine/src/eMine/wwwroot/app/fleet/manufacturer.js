'use strict';
angular.module('emine').controller('manufacturer', manufacturer)
manufacturer.$inject = ['$scope', '$window', 'vehicleService', 'vehicleModelDialog', 'manufacturerDialog', 'utility', 'uiGridConstants'];

function manufacturer($scope, $window, vehicleService, vehicleModelDialog, manufacturerDialog, utility, uiGridConstants) {

    var gridOptions = {
        enableColumnResizing: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
                    { name: 'name', field: 'name', displayName: 'Name', type: 'string' },
                    { name: 'description', field: 'description', displayName: 'Description', type: 'string' },
                    {
                        name: 'sparePartOrderId', field: 'sparePartOrderId', displayName: '', type: 'string', enableColumnMenu: false,
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewModel(row.entity, false, $event)\" aria-label=\"View\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.editModel(row.entity, true, $event)\" module=\"Fleet\" claim=\"ManufacturerModelEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\" aria-label=\"Edit\"></md-icon> Edit</em-button>",
                        cellClass: "text-center", enableHiding: false
                    },

        ]
    };

    var vm = {
        model: {},
        gridOptions: gridOptions,
        addModel: addModel,
        viewModel: viewModel,
        editModel: editModel,
        viewManufacturer: viewManufacturer,
        gridHeight: '0px',
    };

    init();

    return vm;

    function init(){
        vm.model = vehicleService.manufacturer;
        vm.gridOptions.data = vehicleService.modelsList;
        resizeGrid();

        angular.element($window).bind('resize', function () {
            resizeGrid();
        });
        $scope.$on('$destroy', function (e) {
            angular.element($window).unbind('resize');
        });
    }

    function resizeGrid() {
        vm.gridHeight = utility.getSubGridHeight('sub-grid');
    }

    function viewManufacturer(ev){
        manufacturerDialog.viewDialog(vm.model.vehicleManufacturerId, true, ev);
    }

    function addModel(ev) {
        var model = { vehicleModelId: 0, vehicleManufacturerId: vm.model.vehicleManufacturerId }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        vehicleModelDialog.viewDialog(model, editMode, ev);
    }

    function viewModel(model, editMode, ev) {
        model.VehicleModelId = 0;
        vehicleModelDialog.viewDialog(model, editMode, ev);
    }

    function editModel(model, editMode, ev) {
        vehicleModelDialog.viewDialog(model, editMode, ev);
    }

}
