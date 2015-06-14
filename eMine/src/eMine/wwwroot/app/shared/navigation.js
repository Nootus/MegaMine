'use strict';
angular.module('emine').factory('navigation', navigation)
navigation.$inject = ['$rootScope', '$state', '$window', '$location', 'profile'];

function navigation($rootScope, $state, $window, $location, profile) {

    var vm = {
        appTitle: 'eMine',
        isLoading: true,
        initialize: initialize,
        gotoVehicle: gotoVehicle,
        gotoSparePart: gotoSparePart,
        gotomanufacturer: gotomanufacturer,
        go: go,
        breadcrumbs: []
    };

    return vm;

    function initialize() {

        $rootScope.navigation = vm;
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
            vm.isLoading = true;
            $window.document.title = toState.title + ' | ' + vm.appTitle;

            //checking whether user is authenticated
            if (profile.isAuthenticated === false && toState.name !== 'login') {
                evt.preventDefault();
                $state.go('login');
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

    }

    function go(stateName) {
        $state.go(stateName);
    }

    function gotoVehicle(vehicleId) {
        $state.go("vehicle.service", { vehicleid: vehicleId });
    }

    function gotoSparePart(sparePartId) {
        $state.go("sparepart", { sparepartid: sparePartId });
    }

    function gotomanufacturer(manufacturerId) {
        $state.go("manufacturer", { manufacturerid: manufacturerId });
    }
}


