'use strict';
angular.module('emine').controller('index', index)
index.$inject = ['$scope', '$interval', 'profile', 'navigation', 'utility'];

function index($scope, $interval, profile, navigation, utility) {

    var mainMenuItems = [
                        {
                            text: " Fleet", url: "#", spriteCssClass: "icon-menu icon-fleet", module: "Fleet",
                            items: [
                                { text: " Vehicle List", url: "/vehiclelist", spriteCssClass: "icon-menu icon-vehiclelist", module:"Fleet", claim:"VehicleView" },
                                { text: " Service Report", url: "/servicereport", spriteCssClass: "icon-menu icon-report", module: "Fleet", claim: "ServiceReport" },
                                { text: " Spare Parts", url: "/sparepartlist", spriteCssClass: "icon-menu icon-spareparts", module: "Fleet", claim: "SparePartView" },
                                { text: "Administration", url: "", disabled: "disabled", cssClass: "blank-menu-item", module: "Fleet" },
                                { text: " Vehicle Types", url: "/vehicletype", spriteCssClass: "icon-menu icon-vehicletypes", module: "Fleet", claim: "VehicleTypeView" },
                                { text: " Manufacturer", url: "/manufacturerlist", spriteCssClass: "icon-menu icon-manufacturer", module: "Fleet", claim: "ManufacturerView" },
                                { text: " Drivers", url: "/driver", spriteCssClass: "icon-menu icon-driver", module: "Fleet", claim: "DriverView" },
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
        //setMenuPermissions();

        $scope.$watch("vm.profile.firstName", bindProfileMenu);
        $scope.$watch("vm.profile.isAuthenticated", closeProfileMenu);

        ConfigProgressBar();
    }

    //function setMenuPermissions() {
    //    //removing the menu items that user don't have permission
    //    //checking whether user is an admin
    //    var adminUser = false;
    //    var admins = ["SuperAdmin", "GroupAdmin", "CompanyAdmin"];
    //    var adminSuffix = "Admin"
    //    for (var counter = 0; counter < admins.length; counter++) {
    //        if (profile.Roles.indexOf(admins[counter]) >= 0) {
    //            adminUser = true;
    //            break;
    //        }
    //    }

    //    if (!adminUser) {
    //        angular.foreach(mainMenuItems, function (index) {
    //            var menuItem = mainMenuItems[index];
    //            var item, claim;
    //            //checking for module admin
    //            if (profile.Roles.indexOf[menuItem.module + adminSuffix] == -1) {
    //                angular.foreach(menuItem.items, function (itemIndex) {
    //                    item = menuItem.items[itemIndex];
    //                    for (var claimCounter = 0; claimCounter < profile.Claims.length; claimCounter++) {
    //                        claim = profile.Claims[claimCounter];
    //                        if(claim.ClaimType == item.module)
    //                    }
    //                });
    //            }
    //        });
    //    }
    //}

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