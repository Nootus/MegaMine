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
        let Constants = class Constants {
            constructor() {
                this.dateFormat = "dd/MM/yyyy";
                this.dateTimeFormat = "dd/MM/yyyy hh:mm a";
                this.momentDateTimeFormat = "L LT";
                this.devEnvironment = "development";
                this.enum = {
                    dialogMode: { view: 0, save: 1, delete: 2 },
                    buttonType: { view: 0, edit: 1, delete: 2 },
                };
            }
        };
        Constants = __decorate([
            MegaMine.service("megamine", "MegaMine.Shared.Constants"),
            MegaMine.inject()
        ], Constants);
        Shared.Constants = Constants;
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Constants.js.map