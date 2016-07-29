var MegaMine;
(function (MegaMine) {
    var Quarry;
    (function (Quarry) {
        (function (ProcessType) {
            ProcessType[ProcessType["Cutting"] = 1] = "Cutting";
            ProcessType[ProcessType["Crushing"] = 2] = "Crushing";
        })(Quarry.ProcessType || (Quarry.ProcessType = {}));
        var ProcessType = Quarry.ProcessType;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=processType.js.map