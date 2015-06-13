'use strict';

angular.module('emine').controller('login', login);
login.$inject = ['$state', 'accountService', 'profile'];

function login($state, accountService, profile) {

    var vm = {
        model: {},
        init: init,
        userNameFocus: true,
        validate: validate,
    };

    init();

    return vm;

    function init() {
        profile.logout();
        vm.model = accountService.model;
    
    }


    function validate(form) {
        if (form.$valid)
        {
            accountService.validate(vm.model).success(function () {
                $state.go('dashboard');
            });
        }
    }
}

