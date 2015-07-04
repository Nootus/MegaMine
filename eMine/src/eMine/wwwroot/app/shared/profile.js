'use strict'

angular.module('emine').factory('profile', profile);
profile.$inject = [];

function profile() {

    var vm = {
        userID: 1,
        firstName: 'Prasanna',
        lastName: 'Pattam',
        fullName: 'Prasanna Pattam',
        userName: 'prasanna',
        claims: [],
        isAuthenticated: true,
        populate: populate,
        logout: logout
    };

    return vm;

    function populate(data) {
        vm.userID = data.UserID;
        vm.firstName = data.FirstName;
        vm.lastName = data.LastName;
        vm.fullName = data.FullName;
        vm.userName = data.UserName;
        vm.claims = data.Claims;
        vm.isAuthenticated = true;
    };

    function logout() {
        vm.isAuthenticated = false;
    };
};

