'use strict';
angular.module('megamine').controller('index', index)
index.$inject = ['$scope', '$interval', '$timeout', 'profile', 'navigation', 'changePasswordDialog'];

function index($scope, $interval, $timeout, profile, navigation, changePasswordDialog) {

    var vm = {
        navigation: navigation,
        profile: profile,
        startvalue: 0,
        buffervalue: 0,
        showChangePasswordDialog: showChangePasswordDialog,
        changeCompany: changeCompany,
        resetMenu: resetMenu,
        toggleMenu: toggleMenu,
        menuClick: menuClick,
        currentMenuItem: {},
        collapseMenu: false
    };


    init();
    angular.extend(this, vm);
    //vm = this;

    function init() {
        //configProgressBar();
    }

    //function configProgressBar() {
    //    //for the progress bar
    //    vm.startvalue = 10;
    //    vm.buffervalue = 20;
    //    $interval(function () {
    //        if (navigation.isLoading === true) {
    //            vm.startvalue += 1;
    //            vm.buffervalue += 1.5;
    //            if (vm.startvalue > 100) {
    //                vm.startvalue = 30;
    //                vm.buffervalue = 30;
    //            }
    //        }
    //    }, 100, 0, true);
    //}

    function showChangePasswordDialog(ev) {
        changePasswordDialog.viewDialog(ev);
    }

    function changeCompany() {
        //getting profile for the changed company
        profile.get();
        navigation.gotoDashboard();
        resetMenu();
        return true;
    }

    function resetMenu() {
        $scope.accordion_data.current = -1;
    }

    function menuClick(item) {
        angular.extend(vm.currentMenuItem, item);
    }

    function toggleMenu() {
        $scope.vm.collapseMenu = !$scope.vm.collapseMenu;
    }
}