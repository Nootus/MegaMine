module MegaMine.Account {

    @service("megamine", "MegaMine.Account.ChangePasswordDialog")
    @inject("MegaMine.Account.AccountService", "MegaMine.Shared.Dialog.DialogService", "MegaMine.Shared.Message")
    export class ChangePasswordDialog {
        public model: Models.IChangePasswordModel;
        constructor(private accountService: AccountService, private dialogService: Shared.Dialog.DialogService<Models.IChangePasswordModel>
            , private message: MegaMine.Shared.Message) {
        }


        public viewDialog(ev: ng.IAngularEvent): void {
            const self: ChangePasswordDialog = this;
            let error: Shared.Models.INtException;
            let validator: Shared.Models.IDataValidator = {
                errorMessages: [{ type: "passsordSame", text: self.message.samePassword }],
                validate: self.validatePasswords
            };

            self.dialogService.show({
                templateUrl: "/app/account/changePasswordDialog.html",
                targetEvent: ev,
                data: { model: self.model, validator: validator, error: error },
                dialogMode: Shared.Dialog.Models.DialogMode.save
            })
                .then(function (dialogModel: Models.IChangePasswordModel): void {
                    self.accountService.changePassword(dialogModel).then(function (): void {
                        self.dialogService.hide();
                    }).catch(function (data: Shared.Models.INtException): void {
                        error.message = data.message;
                        error.errors = data.errors;
                    });
                });
        }

        public validatePasswords(form: Models.IChangePasswordFormController): void {
            if (form !== undefined) {
                if (form.newPassword.$modelValue !== form.confirmPassword.$modelValue) {
                    form.confirmPassword.$setValidity("passsordSame", false);
                } else {
                    form.confirmPassword.$setValidity("passsordSame", true);
                }
            }
        }
    }
}
