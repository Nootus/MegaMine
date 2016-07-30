'use strict';
angular.module('megamine').controller('index', index)
index.$inject = ['$scope', '$interval', '$timeout', "MegaMine.Shared.Profile", "MegaMine.Shared.Navigation", 'changePasswordDialog'];

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

    }

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
        vm.currentMenuItem.pageId = -1;
    }

    function menuClick(item) {
        angular.extend(vm.currentMenuItem, item);
    }

    function toggleMenu() {
        $scope.vm.collapseMenu = !$scope.vm.collapseMenu;
    }
}