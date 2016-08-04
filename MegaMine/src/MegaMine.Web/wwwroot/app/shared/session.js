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
        "use strict";
        let Session = class Session {
            constructor($window, toastr, navigation, profile, constants) {
                this.$window = $window;
                this.toastr = toastr;
                this.navigation = navigation;
                this.profile = profile;
                this.constants = constants;
            }
            initialize() {
                let self = this;
                self.toastr.options.positionClass = "toast-bottom-right";
                self.toastr.options.backgroundpositionClass = "toast-bottom-right";
                self.navigation.initialize();
                // global values
                self.$window.navigation = self.navigation;
                self.$window.profile = self.profile;
                self.$window.constants = self.constants;
            }
        };
        Session = __decorate([
            MegaMine.service("megamine", "MegaMine.Shared.Session"),
            MegaMine.inject("$window", "toastr", "MegaMine.Shared.Navigation", "MegaMine.Shared.Profile", "MegaMine.Shared.Constants")
        ], Session);
        Shared.Session = Session;
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Session.js.map