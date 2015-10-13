'use strict';

angular.module('emine').controller('login', login);
login.$inject = ['$state', 'accountService'];

function login($state, accountService) {

    var vm = {
        model: {},
        init: init,
        userNameFocus: true,
        validate: validate,
    };

    init();

    return vm;

    function init() {
        vm.model = accountService.model;
    }


    function validate(form) {
        if (form.$valid) {
            accountService.validate(vm.model).then(function () {
                $state.go('dashboard');
            });
        }
    }
}

