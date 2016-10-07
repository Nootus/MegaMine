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
        let Login = class Login {
            constructor($state, accountService) {
                this.$state = $state;
                this.accountService = accountService;
            }
            validate(form) {
                const self = this;
                if (form.$valid) {
                    self.accountService.validate(self.model).then(function () {
                        self.$state.go("dashboard");
                    });
                }
            }
        };
        Login = __decorate([
            MegaMine.controller("megamine", "MegaMine.Account.Login"),
            MegaMine.inject("$state", "MegaMine.Account.AccountService")
        ], Login);
        Account.Login = Login;
    })(Account = MegaMine.Account || (MegaMine.Account = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Login.js.map