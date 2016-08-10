module MegaMine.Account {

    @controller("megamine", "MegaMine.Account.Login")
    @inject("$state", "MegaMine.Account.AccountService")
    export class Login {
        public model: Models.ILoginModel;
        constructor(private $state: ng.ui.IStateService, private accountService: AccountService) {
        }


        public validate(form: ng.IFormController): void {
            const self: Login = this;
            if (form.$valid) {
                self.accountService.validate(self.model).then(function (): void {
                    self.$state.go("dashboard");
                });
            }
        }
    }
}
