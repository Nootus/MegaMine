'use strict';
angular.module('emine').controller('index', index)
index.$inject = ['$scope', '$interval', 'profile', 'navigation', 'utility'];

function index($scope, $interval, profile, navigation, utility) {

    var vm = {
        navigation: navigation,
        profile: profile,
        menuSelect: menuSelect,
    };


    angular.extend(this, vm);

    init();

    function init() {
        //setMenuPermissions();

        $scope.$watch("vm.profile.isAuthenticated", bindProfileMenu);
        //$scope.$watch("vm.profile.isAuthenticated", closeProfileMenu);

        ConfigProgressBar();
    }

    function ConfigProgressBar() {
        //for the progress bar
        $scope.startvalue = 10;
        $scope.buffervalue = 20;
        $interval(function () {
            if (navigation.isLoading === true) {
                $scope.startvalue += 1;
                $scope.buffervalue += 1.5;
                if ($scope.startvalue > 100) {
                    $scope.startvalue = 30;
                    $scope.buffervalue = 30;
                }
            }
        }, 100, 0, true);
    }

    function bindProfileMenu() {

        $("#profile-menu").kendoMenu({
            dataSource: [
                    {
                        text: profile.firstName, url: "#",
                        items: [
                            { text: "Change Password", url: "#", spriteCssClass: "icon-menu icon-changepassword" },
                            { text: "Logout", url: "/login", spriteCssClass: "icon-menu icon-logout" }
                        ]
                    }
            ],
            select: menuSelect
        });

        $("#main-menu").kendoMenu({
            dataSource: profile.menu,
            select: menuSelect
        });
    }

    function menuSelect(e) {

        var menu = $("#main-menu").data("kendoMenu");
        if (menu !== undefined)
            menu.close("#main-menu");

        return;
    }


}