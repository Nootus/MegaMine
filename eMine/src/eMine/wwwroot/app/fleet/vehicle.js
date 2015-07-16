'use strict';
angular.module('emine').controller('vehicle', vehicle)
vehicle.$inject = ['$state', 'vehicleService', 'vehicleDialog', 'utility', 'profile'];

function vehicle($state, vehicleService, vehicleDialog, utility, profile) {

    var vm = {
        model: {},
        menuItems: [],
        viewVehicle: viewVehicle,
        resetFuel: resetFuel,
        menuSelect: menuSelect
    };

    init();

    return vm;

    function init() {
        vm.model = vehicleService.vehicle;
        vm.menuItems = getMenu();
    }

    function viewVehicle(ev) {
        vehicleDialog.viewDialog(vm.model.VehicleId, true, ev);
    }

    function getMenu() {
        var items = [];

        if (profile.isAuthorized("Fleet", "VehicleServiceView"))
            items.push(getMenuItem(" Service History", "service", "service"));

        if (profile.isAuthorized("Fleet", "VehicleFuelView"))
            items.push(getMenuItem(" Fuel History", "fuel", "fuel"));

        if (profile.isAuthorized("Fleet", "VehicleDriverView"))
            items.push(getMenuItem(" Driver History", "driver", "driver"));

        if (profile.isAuthorized("Fleet", "VehicleTripView"))
            items.push(getMenuItem(" Trip History", "vehicletrip", "trip"));

        return items;
    }

    function getMenuItem(text, url, iconCss)
    {
        var cssClass = "";
        var spriteCssClass = "icon-menu icon-" + iconCss
        var hash = utility.routePath("vehicle/" + vm.model.VehicleId + "/" + url);
        var currentHash = $state.href($state.current.name, $state.params);
        if (hash === currentHash)
        {
            cssClass = "k-state-highlight";
        }
        return { text: text, url: hash, cssClass: cssClass, spriteCssClass: spriteCssClass };
    }

    function menuSelect(e)
    {
        $(e.item).siblings().removeClass("k-state-highlight");
        $(e.item).addClass("k-state-highlight");
    }

    function resetFuel(e)
    {
        vehicleService.resetFuel(vm.model.VehicleId);
    }

}
