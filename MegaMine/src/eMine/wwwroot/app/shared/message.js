'use strict'

angular.module('megamine').factory('message', message);
message.$inject = [];

function message() {
    var vm = {
        unAuthorized: 'Unauthorized',
        noStockMessage: 'No Stock at the selected yard',
        dupYard: 'From and To yards can\'t be same',
        samePassword: 'New and Confirm password should be same'
};

    return vm;

}