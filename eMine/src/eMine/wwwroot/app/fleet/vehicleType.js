'use strict';
angular.module('emine').controller('vehicleType', vehicleType)
vehicleType.$inject = ['$scope', 'vehicleService', 'vehicleTypeDialog', 'utility'];

function vehicleType($scope, vehicleService, vehicleTypeDialog, utility) {

    var gridOptions = {
        columnDefs: [
                    { name: 'vehicleTypeName', field: 'vehicleTypeName', displayName: 'Vehicle Type', type: 'string', enableHiding: false },
                    { name: 'vehicleTypeDescription', field: 'vehicleTypeDescription', type: 'string', displayName: 'Description', enableHiding: false },
                    {
                        name: 'vehicleTypeId', field: 'vehicleTypeId', displayName: '', enableColumnMenu: false, type: 'string',
                        cellTemplate: "<md-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, false, $event)\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/eye.svg\"></md-icon> View</md-button>  <em-button class=\"md-raised\" ng-click=\"grid.appScope.vm.viewDialog(row.entity, true, $event)\" module=\"Fleet\" claim=\"VehicleTypeEdit\"><md-icon class=\"icon-button\" md-svg-icon=\"content/images/icons/edit.svg\"></md-icon> Edit</md-button>",
                        cellClass: "text-center", enableHiding: false
                    },
        ]
    };


    var vm = {
        gridOptions: gridOptions,
        viewDialog: viewDialog,
        addVehicleType: addVehicleType
    };

    init();

    return vm;

    function init() {
        utility.initializeGrid(vm, $scope, vehicleService.vehicleTypes);
    }

    function addVehicleType(ev) {
        var model = { vehicleTypeId: 0 }
        viewDialog(model, true, ev);
    }

    function viewDialog(model, editMode, ev) {
        vehicleTypeDialog.viewDialog(model, editMode, ev);
    }
}

