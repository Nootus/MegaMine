module MegaMine.Account {

    @service("megamine", "MegaMine.Account.AccountService")
    @inject("$http", "MegaMine.Shared.Profile")
    export class AccountService {

        constructor(private $http: ng.IHttpService, private profile: MegaMine.Shared.Profile) {
        }

        public validate(model: Models.ILoginModel): ng.IHttpPromise<Shared.Models.IProfileModel> {
            const self: AccountService = this;
            return self.$http.post("/api/account/validate", model)
                .then(function (data: Shared.Models.IProfileModel): Shared.Models.IProfileModel {
                    self.profile.populate(data) ;
                    return data;
                });
        }

        public logout(): ng.IHttpPromise<void> {
            const self: AccountService = this;
            return self.$http.get<void>("/api/account/logout");
        }

        public changePassword(model: Models.IChangePasswordModel): ng.IHttpPromise<void> {
            const self: AccountService = this;
            return self.$http.post<void>("/api/account/changepassword", model);
        }
    }
}
