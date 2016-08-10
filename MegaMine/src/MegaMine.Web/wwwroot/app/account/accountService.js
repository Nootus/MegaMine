var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Account;
    (function (Account) {
        let AccountService = class AccountService {
            constructor($http, profile) {
                this.$http = $http;
                this.profile = profile;
            }
            validate(model) {
                const self = this;
                return self.$http.post("/api/account/validate", model)
                    .then(function (data) {
                    self.profile.populate(data);
                    return data;
                });
            }
            logout() {
                const self = this;
                return self.$http.get("/api/account/logout");
            }
            changePassword(model) {
                const self = this;
                return self.$http.post("/api/account/changepassword", model);
            }
        };
        AccountService = __decorate([
            MegaMine.service("megamine", "MegaMine.Account.AccountService"),
            MegaMine.inject("$http", "MegaMine.Shared.Profile")
        ], AccountService);
        Account.AccountService = AccountService;
    })(Account = MegaMine.Account || (MegaMine.Account = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=AccountService.js.map