'use strict'

angular.module('emine').factory('session', session);
session.$inject = [ '$window', 'toastr', 'navigation', 'constants'];

function session($window, toastr, navigation, constants) {

    var breadcrumbs = [];
    var breadcrumbsService = {};


    var vm = {
        navigation: navigation,
        //profile: profile,
        initialize: initialize,
    };

    return vm;

    function initialize() {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.backgroundpositionClass = 'toast-bottom-right';

        navigation.initialize();

        //global values
        $window.navigation = navigation;
        $window.constants = constants
    }
};

