'use strict'

angular.module('emine').factory('session', session);
session.$inject = ['$rootScope', '$state', '$window', '$http', 'toastr', 'profile', 'navigation', '$location'];

function session($rootScope, $state, $window, $http, toastr, profile, navigation, $location) {

    var breadcrumbs = [];
    var breadcrumbsService = {};


    var vm = {
        navigation: navigation,
        profile: profile,
        initialize: initialize,
        logout: logout
    };

    return vm;

    function initialize() {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.backgroundpositionClass = 'toast-bottom-right';

        navigation.initialize();
    }

    function logout() {
        profile.logout();
    }

};

