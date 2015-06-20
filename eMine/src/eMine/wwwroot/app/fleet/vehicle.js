'use strict';
angular.module('emine').controller('vehicle', vehicle)
vehicle.$inject = ['$state', 'vehicleService', 'vehicleDialog', 'utility'];

function vehicle($state, vehicleService, vehicleDialog, utility) {

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
        vm.menuItems = getMenu();
    }

    function viewVehicle(ev) {
        vehicleDialog.viewDialog(vm.model.VehicleId, true, ev);
    }

    function getMenu() {
        return [
                    getMenuItem(" Service History", "service", "service"),
                    getMenuItem(" Fuel History", "fuel", "fuel"),
                    getMenuItem(" Driver History", "driver", "driver"),
                    getMenuItem(" Trip History", "vehicletrip", "vehicletrip")
        ];
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

}
