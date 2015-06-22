'use strict';
angular.module('emine').controller('index', index)
index.$inject = ['$scope', '$interval', 'profile', 'navigation', 'utility'];

function index($scope, $interval, profile, navigation, utility) {

    var mainMenuItems = [
                        {
                            text: " Fleet", url: "#", spriteCssClass: "icon-menu icon-fleet",
                            items: [
                                { text: " Vehicle List", url: "/vehiclelist", spriteCssClass: "icon-menu icon-vehiclelist" },
                                { text: " Service Report", url: "/servicereport", spriteCssClass: "icon-menu icon-report" },
                                { text: " Spare Parts", url: "/sparepartlist", spriteCssClass: "icon-menu icon-spareparts" },
                                { text: "Administration", url: "", disabled: "disabled", cssClass: "blank-menu-item" },
                                { text: " Vehicle Types", url: "/vehicletype", spriteCssClass: "icon-menu icon-vehicletypes" },
                                { text: " Manufacturer", url: "/manufacturerlist", spriteCssClass: "icon-menu icon-manufacturer" },
                                { text: " Drivers", url: "/driver", spriteCssClass: "icon-menu icon-driver" },
                            ]
                        },
                        {
                            text: "Quarry", url: "#", spriteCssClass: "icon-menu icon-quarry",
                            items: [
                                { text: " Quarries", url: "#", spriteCssClass: "icon-menu icon-quarries" },
                                { text: " Yards", url: "#", spriteCssClass: "icon-menu icon-yards" },
                                { text: " Add Material", url: "#", spriteCssClass: "icon-menu icon-addmaterial" },
                                { text: " Move Material", url: "#", spriteCssClass: "icon-menu icon-movematerial" },
                                { text: " Stock at Yard", url: "#", spriteCssClass: "icon-menu icon-stockatyard" }
                            ]
                        }
    ];


    var vm = {
        navigation: navigation,
        profile: profile,
        mainMenuItems: mainMenuItems,
        menuSelect: menuSelect,
    };


    angular.extend(this, vm);

    init();

    function init() {
        $scope.$watch("vm.profile.firstName", bindProfileMenu);
        $scope.$watch("vm.profile.isAuthenticated", closeProfileMenu);

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

    function bindProfileMenu(name) {

        $("#profile-menu").kendoMenu({
            dataSource: [
                    {
                        text: name, url: "#",
                        items: [
                            { text: "Change Password", url: "#", spriteCssClass: "icon-menu icon-changepassword" },
                            { text: "Logout", url: "/login", spriteCssClass: "icon-menu icon-logout" }
                        ]
                    }
            ],
            select: menuSelect
        });
    }

    function closeProfileMenu(isAuthenticated) {
        if (isAuthenticated === true) {
            var menu = $("#profile-menu").data("kendoMenu");
            if (menu !== undefined)
                menu.close("#profile-menu");
        }
    }

    function menuSelect(e) {

        var menu = $("#main-menu").data("kendoMenu");
        if (menu !== undefined)
            menu.close("#main-menu");

        return;
    }


}