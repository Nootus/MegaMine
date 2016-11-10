var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Shared;
    (function (Shared) {
        let Messages = class Messages {
            constructor() {
                this.unAuthorized = "Unauthorized";
                this.confirmError = "Please fix the errors before saving";
                this.numberInvalid = "Invalid number";
                this.timeInvalid = "Invalid time";
                this.timeRangeInvalid = "Start time should be before end time";
                // quarry
                this.noStockMessage = "No Stock at the selected yard";
                this.dupYard = "From and To yards can\'t be same";
                this.samePassword = "New and Confirm password should be same";
                this.invalidEndTime = "End time should be more than start time";
                this.invalidEndDate = "End date should be more than start date";
                this.invalidEndOdometer = "Odometer End should be more than start";
                this.required = "Required!";
                // plant messages
                this.BlockRequired = "There should be at least one block";
                this.StoppageTimeRangeInvalid = "Invalid start and end time for Stoppages";
                this.StoppageTimeOverlapInvalid = "Time should not overlap in stoppages";
                this.OperatorRequired = "There should be at least one operator";
                this.OperatorTimeOverlapInvalid = "Time should not overlap for operators";
            }
        };
        Messages = __decorate([
            MegaMine.service("megamine", "MegaMine.Shared.Messages"),
            MegaMine.inject()
        ], Messages);
        Shared.Messages = Messages;
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Messages.js.map