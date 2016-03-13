'use strict'

angular.module('megamine').factory('message', message);
message.$inject = [];

function message() {
    var vm = {
        unAuthorized: "Unauthorized",
        confirmError: 'Please fix the errors before saving',
        numberInvalid: 'Invalid number',
        timeInvalid: 'Invalid time',
        timeRangeInvalid: 'Start time should be before end time',
        //Quarry
        noStockMessage: "No Stock at the selected yard",
        dupYard: "From and To yards can\'t be same",
        samePassword: "New and Confirm password should be same",
        invalidEndTime: "End time should be more than start time",
        invalidEndDate: "End date should be more than start date",
        invalidEndOdometer: "Odometer End should be more than start",
        required: "Required!",
        //Plant messages
        BlockRequired: 'There should be at least one block',
        StoppageTimeRangeInvalid: 'Invalid start and end time for Stoppages',
        StoppageTimeOverlapInvalid: 'Time should not overlap in stoppages',
        OperatorRequired: 'There should be at least one operator',
        OperatorTimeOverlapInvalid: 'Time should not overlap for operators',
    };

    return vm;

}