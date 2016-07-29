'use strict'

angular.module('megamine').factory('session', session);
session.$inject = [ '$window', 'toastr', 'navigation', "MegaMine.Shared.Profile", "MegaMine.Shared.Constants"];

function session($window, toastr, navigation, profile, constants) {

    var breadcrumbs = [];
    var breadcrumbsService = {};


    var vm = {
        navigation: navigation,
        initialize: initialize,
    };

    return vm;

    function initialize() {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.backgroundpositionClass = 'toast-bottom-right';

        navigation.initialize();

        //global values
        $window.navigation = navigation;
        $window.profile = profile;
        $window.constants = constants
    }
};

