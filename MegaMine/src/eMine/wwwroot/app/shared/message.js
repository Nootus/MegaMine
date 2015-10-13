'use strict'

angular.module('emine').factory('message', message);
message.$inject = [];

function message() {
    var vm = {
        unAuthorized: 'Unauthorized',
        noStockMessage: 'No Stock'
    };

    return vm;

}