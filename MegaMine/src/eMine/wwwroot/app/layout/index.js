'use strict';
angular.module('emine').controller('index', index)
index.$inject = ['$scope', '$interval', 'profile', 'navigation'];

function index($scope, $interval, profile, navigation) {

    var vm = {
        navigation: navigation,
        profile: profile,
        startvalue: 0,
        buffervalue: 0
    };


    init();
    angular.extend(this, vm);
    vm = this;

    function init() {
        configProgressBar();
    }

    function configProgressBar() {
        //for the progress bar
        vm.startvalue = 10;
        vm.buffervalue = 20;
        $interval(function () {
            if (navigation.isLoading === true) {
                vm.startvalue += 1;
                vm.buffervalue += 1.5;
                if (vm.startvalue > 100) {
                    vm.startvalue = 30;
                    vm.buffervalue = 30;
                }
            }
        }, 100, 0, true);
    }
}