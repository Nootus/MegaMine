var MegaMine;
(function (MegaMine) {
    var Quarry;
    (function (Quarry) {
        var Models;
        (function (Models) {
            (function (ProcessType) {
                ProcessType[ProcessType["Cutting"] = 1] = "Cutting";
                ProcessType[ProcessType["Crushing"] = 2] = "Crushing";
            })(Models.ProcessType || (Models.ProcessType = {}));
            var ProcessType = Models.ProcessType;
        })(Models = Quarry.Models || (Quarry.Models = {}));
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=ProcessType.js.map