'use strict';

angular.module('megamine').config(appRoute);
appRoute.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function appRoute($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state("dashboard", {
            url: window.virtualDirectory + "/",
            title: "Dashboard",
            previousState: "",
            templateUrl: "/app/dashboard/dashboard.html",
            controller: "dashboard",
            controllerAs: "vm",
            resolve: {
                resolveModel: ['dashboardService', function (dashboardService) {
                    return dashboardService.resolve();
                }]
            }
        })
        .state("login", {
            url: window.virtualDirectory + "/login",
            title: "Login",
            previousState: "",
            templateUrl: "/app/account/login.html",
            controller: "login",
            controllerAs: "vm",
        })
        .state("logout", {
            url: window.virtualDirectory + "/logout",
            title: "Login",
            previousState: "",
            templateUrl: "/app/account/login.html",
            controller: "login",
            controllerAs: "vm",
            resolve: {
                resolveModel: ["MegaMine.Shared.Profile", 'accountService', function (profile, accountService) {
                    profile.logout();
                    return accountService.logout();
                }]
            }
        })

    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('', '/')
    $urlRouterProvider.when(window.virtualDirectory + '/', window.virtualDirectory);
}
