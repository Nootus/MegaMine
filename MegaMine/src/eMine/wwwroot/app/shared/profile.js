'use strict'

angular.module('megamine').factory('profile', profile);
profile.$inject = [];

function profile() {

    var vm = {
        userID: 1,
        firstName: undefined,
        lastName: undefined,
        fullName: undefined,
        userName: undefined,
        companyId: undefined,
        companies: [],
        roles: [],
        claims: [],
        menu: [],
        isAuthenticated: false,
        populate: populate,
        logout: logout,
        isAuthorized: isAuthorized
    };

    return vm;

    function populate(data) {
        vm.userID = data.userID;
        vm.firstName = data.firstName;
        vm.lastName = data.lastName;
        vm.fullName = data.fullName;
        vm.userName = data.userName;
        vm.companyId = data.companyId;
        vm.companies = data.companies;
        vm.roles = data.roles;
        vm.claims = data.claims;
        vm.isAuthenticated = true;
        vm.menu.splice(0, vm.menu.length);
        angular.extend(vm.menu, data.menu);
    };

    function logout() {
        vm.isAuthenticated = false;
    };

    function isAuthorized(module, claim) {
        var response = false;

        if (vm.roles.indexOf(module + "Admin") === -1) {
            for(var counter = 0; counter < vm.claims.length; counter ++){
                if (vm.claims[counter].claimType === module && vm.claims[counter].claimValue === claim) {
                    response = true;
                    break;
                }
            }
        }
        else {
            response = true;
        }

        return response;
    }
};

