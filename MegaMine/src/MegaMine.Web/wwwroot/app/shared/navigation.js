'use strict';
angular.module('megamine').factory('navigation', navigation)
navigation.$inject = ['$rootScope', '$state', '$window', '$location', '$http', 'profile', 'utility', 'constants'];

function navigation($rootScope, $state, $window, $location, $http, profile, utility, constants) {

    var vm = {
        appTitle: 'Mega Mine',
        environmentName: window.environmentName,
        isLoading: true,
        initialize: initialize,
        gotoVehicle: gotoVehicle,
        gotoSparePart: gotoSparePart,
        gotoManufacturer: gotoManufacturer,
        gotoDashboard: gotoDashboard,
        go: go,
        breadcrumbs: [],
        vehicleMenuItems: [],
        populateVehicleMenu: populateVehicleMenu
    };

    return vm;

    function initialize() {

        $rootScope.navigation = vm;
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
            vm.isLoading = true;
            $window.document.title = toState.title + ' | ' + vm.appTitle;

            //checking whether user is authenticated
            if (profile.isAuthenticated === false && toState.name !== 'login') {
                if (vm.environmentName.toLowerCase() === constants.devEnvironment) {
                    profile.get();
                }
                else {
                    evt.preventDefault();
                    $state.go('login');
                }
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
            vm.isLoading = false;

            if (toState.name === "dashboard") {
                while (vm.breadcrumbs.pop()) { }
            }
            else {
                while (vm.breadcrumbs.length > 0) {
                    if (vm.breadcrumbs[vm.breadcrumbs.length - 1].name === toState.previousState) {
                        break;
                    }
                    vm.breadcrumbs.pop();
                }
            }

            //adding the breadcrumbs
            vm.breadcrumbs.push({ name: toState.name, title: toState.title, url: $location.$$path });
        });

        //window resize
        angular.element($window).on('resize', function (e) {
            $rootScope.$broadcast('resize');
        });


    }

    function go(stateName) {
        $state.go(stateName);
    }

    function gotoDashboard() {
        $state.go("dashboard");
    }

    function gotoVehicle(vehicleId) {
        var state = "vehicle";
        populateVehicleMenu(vehicleId); //populating the vehicle menu items
        if (vm.vehicleMenuItems.length > 0) {
            state += "." + vm.vehicleMenuItems[0].state;
        }
        $state.go(state, { vehicleid: vehicleId });
    }

    function gotoSparePart(sparePartId) {
        $state.go("sparepart", { sparepartid: sparePartId });
    }

    function gotoManufacturer(manufacturerId) {
        $state.go("manufacturer", { manufacturerid: manufacturerId });
    }


    function populateVehicleMenu(vehicleId) {
        vm.vehicleMenuItems.splice(0, vm.vehicleMenuItems.length);

        if (profile.isAuthorized(["Fleet:VehicleServiceView"]))
            vm.vehicleMenuItems.push(getVehicleMenuItem(vehicleId, " Service History", "service", "service"));

        if (profile.isAuthorized(["Fleet:VehicleFuelView"]))
            vm.vehicleMenuItems.push(getVehicleMenuItem(vehicleId, " Fuel History", "fuel", "fuel"));

        if (profile.isAuthorized(["Fleet:VehicleDriverView"]))
            vm.vehicleMenuItems.push(getVehicleMenuItem(vehicleId, " Driver History", "driver", "driver"));

        if (profile.isAuthorized(["Fleet:VehicleTripView"]))
            vm.vehicleMenuItems.push(getVehicleMenuItem(vehicleId, " Trip History", "vehicletrip", "trip"));
    }

    function getVehicleMenuItem(vehicleId, text, url, iconCss) {
        var cssClass = "";
        var iconCssClass = "icon-menu icon-" + iconCss
        var hash = utility.routePath("vehicle/" + vehicleId + "/" + url);
        var currentHash = $state.href($state.current.name, $state.params);
        if (hash === currentHash) {
            cssClass = "highlight";
        }
        return { text: text, url: hash, state: url, cssClass: cssClass, iconCssClass: iconCssClass };
    }


}
