'use strict';
angular.module('emine').controller('vehicle', vehicle)
vehicle.$inject = ['$state', 'vehicleService', 'vehicleDialog', 'utility', 'profile', 'navigation'];

function vehicle($state, vehicleService, vehicleDialog, utility, profile, navigation) {

    var vm = {
        model: {},
        menuItems: [],
        viewVehicle: viewVehicle,
        menuSelect: menuSelect
    };

    init();

    return vm;

    function init() {
        vm.model = vehicleService.vehicle;
        if (navigation.vehicleMenuItems.length === 0)
            navigation.populateVehicleMenu(vm.model.vehicleId);
        vm.menuItems = navigation.vehicleMenuItems;
    }

    function viewVehicle(ev) {
        vehicleDialog.viewDialog(vm.model.vehicleId, true, ev);
    }

    function menuSelect(e){
        $(e.item).siblings().removeClass("k-state-highlight");
        $(e.item).addClass("k-state-highlight");
    }

}
