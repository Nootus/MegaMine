'use strict'

angular.module('emine').factory('profile', profile);
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
        vm.userID = data.UserID;
        vm.firstName = data.FirstName;
        vm.lastName = data.LastName;
        vm.fullName = data.FullName;
        vm.userName = data.UserName;
        vm.companyId = data.CompanyId;
        vm.companies = data.Companies;
        vm.roles = data.Roles;
        vm.claims = data.Claims;
        vm.isAuthenticated = true;
        vm.menu.splice(0, vm.menu.length);
        angular.extend(vm.menu, data.Menu);
    };

    function logout() {
        vm.isAuthenticated = false;
    };

    function isAuthorized(module, claim) {
        var response = false;

        if (vm.roles.indexOf(module + "Admin") === -1) {
            for(var counter = 0; counter < vm.claims.length; counter ++){
                if (vm.claims[counter].ClaimType === module && vm.claims[counter].ClaimValue === claim) {
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

