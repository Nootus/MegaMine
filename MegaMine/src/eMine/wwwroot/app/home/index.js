'use strict';
angular.module('megamine').controller('index', index)
index.$inject = ['$scope', '$interval', 'profile', 'navigation', 'changePasswordDialog'];

function index($scope, $interval, profile, navigation, changePasswordDialog) {

    var vm = {
        navigation: navigation,
        profile: profile,
        startvalue: 0,
        buffervalue: 0,
        showChangePasswordDialog: showChangePasswordDialog,
        changeCompany: changeCompany
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

    function showChangePasswordDialog(ev) {
        changePasswordDialog.viewDialog(ev);
    }

    function changeCompany() {
        //getting profile for the changed company
        profile.get();
        navigation.gotoDashboard();
        return true;
    }
}