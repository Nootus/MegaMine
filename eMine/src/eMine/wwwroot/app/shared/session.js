'use strict'

angular.module('emine').factory('session', session);
session.$inject = [ '$window', 'toastr', 'navigation'];

function session($window, toastr,  navigation) {

    var breadcrumbs = [];
    var breadcrumbsService = {};


    var vm = {
        navigation: navigation,
        //profile: profile,
        initialize: initialize,
        logout: logout
    };

    return vm;

    function initialize() {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.backgroundpositionClass = 'toast-bottom-right';

        navigation.initialize();

        //global values
        $window.navigation = navigation;
    }

    function logout() {
        //profile.logout();
    }

};

