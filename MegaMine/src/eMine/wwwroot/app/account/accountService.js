'use strict'

angular.module('emine').factory('accountService', accountService);

accountService.$inject = ['$http', 'profile'];

function accountService($http, profile) {
    var model = {
        UserName: '',
        UserPassword: ''
    };

    var service = {
        model: model,
        validate: validate,
        logout: logout,
        changePassword: changePassword
    };

    return service;

    function validate(model) {
        return $http.post("/api/account/validate", model)
            .then(function (data) {
                profile.populate(data);
            });
    }

    function logout() {
        return $http.get("/api/account/logout");
    }

    function changePassword(model) {
        return $http.post("/api/account/changepassword", model);
    }


}
