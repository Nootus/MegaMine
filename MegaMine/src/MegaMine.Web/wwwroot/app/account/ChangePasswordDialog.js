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
        let ChangePasswordDialog = class ChangePasswordDialog {
            constructor(accountService, dialogService, messages) {
                this.accountService = accountService;
                this.dialogService = dialogService;
                this.messages = messages;
            }
            viewDialog(ev) {
                const self = this;
                let error = {};
                let validator = {
                    errorMessages: [{ type: "passsordSame", text: self.messages.samePassword }],
                    validate: self.validatePasswords
                };
                self.dialogService.show({
                    templateUrl: "/app/account/changePasswordDialog.html",
                    targetEvent: ev,
                    data: { model: self.model, validator: validator, error: error },
                    dialogMode: 1 /* save */
                })
                    .then(function (dialogModel) {
                    self.accountService.changePassword(dialogModel).then(function () {
                        self.dialogService.hide();
                    }).catch(function (data) {
                        error.message = data.message;
                        error.errors = data.errors;
                    });
                });
            }
            validatePasswords(form) {
                if (form !== undefined && form.newPassword !== undefined) {
                    if (form.newPassword.$modelValue !== form.confirmPassword.$modelValue) {
                        form.confirmPassword.$setValidity("passsordSame", false);
                    }
                    else {
                        form.confirmPassword.$setValidity("passsordSame", true);
                    }
                }
            }
        };
        ChangePasswordDialog = __decorate([
            MegaMine.service("megamine", "MegaMine.Account.ChangePasswordDialog"),
            MegaMine.inject("MegaMine.Account.AccountService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Messages")
        ], ChangePasswordDialog);
        Account.ChangePasswordDialog = ChangePasswordDialog;
    })(Account = MegaMine.Account || (MegaMine.Account = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=ChangePasswordDialog.js.map