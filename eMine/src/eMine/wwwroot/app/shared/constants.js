'use strict'

angular.module('emine').factory('constants', constants);
constants.$inject = [];

function constants() {
    var vm = {
        dateFormat: "dd/MM/yyyy",
        dateTimeFormat: "dd/MM/yyyy hh:mm a",
        momentDateTimeFormat: "L LT",
        devEnvironment: "development"
    };

    return vm;

}