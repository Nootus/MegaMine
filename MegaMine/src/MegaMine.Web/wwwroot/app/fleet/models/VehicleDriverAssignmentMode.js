var MegaMine;
(function (MegaMine) {
    var Fleet;
    (function (Fleet) {
        var Models;
        (function (Models) {
            (function (VehicleDriverAssignmentMode) {
                VehicleDriverAssignmentMode[VehicleDriverAssignmentMode["none"] = 0] = "none";
                VehicleDriverAssignmentMode[VehicleDriverAssignmentMode["assign"] = 1] = "assign";
                VehicleDriverAssignmentMode[VehicleDriverAssignmentMode["unassign"] = 2] = "unassign";
            })(Models.VehicleDriverAssignmentMode || (Models.VehicleDriverAssignmentMode = {}));
            var VehicleDriverAssignmentMode = Models.VehicleDriverAssignmentMode;
        })(Models = Fleet.Models || (Fleet.Models = {}));
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=VehicleDriverAssignmentMode.js.map