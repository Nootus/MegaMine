module MegaMine.Shared {

    "use strict";
    @service("megamine", "MegaMine.Shared.Message")
    @inject()
    export class Message {

        public unAuthorized: string = "Unauthorized";
        public confirmError: string = "Please fix the errors before saving";
        public numberInvalid: string = "Invalid number";
        public timeInvalid: string = "Invalid time";
        public timeRangeInvalid: string = "Start time should be before end time";
        // quarry
        public noStockMessage: string = "No Stock at the selected yard";
        public dupYard: string = "From and To yards can\'t be same";
        public samePassword: string = "New and Confirm password should be same";
        public invalidEndTime: string = "End time should be more than start time";
        public invalidEndDate: string = "End date should be more than start date";
        public invalidEndOdometer: string = "Odometer End should be more than start";
        public required: string = "Required!";
        // plant messages
        public BlockRequired: string = "There should be at least one block";
        public StoppageTimeRangeInvalid: string = "Invalid start and end time for Stoppages";
        public StoppageTimeOverlapInvalid: string = "Time should not overlap in stoppages";
        public OperatorRequired: string = "There should be at least one operator";
        public OperatorTimeOverlapInvalid: string = "Time should not overlap for operators";
    }
}
