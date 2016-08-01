var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var App;
    (function (App) {
        "use strict";
        var Run = (function () {
            function Run(session) {
                session.initialize();
            }
            Run = __decorate([
                MegaMine.run("megamine"),
                MegaMine.inject("MegaMine.Shared.Session")
            ], Run);
            return Run;
        }());
    })(App = MegaMine.App || (MegaMine.App = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=app.run.js.map