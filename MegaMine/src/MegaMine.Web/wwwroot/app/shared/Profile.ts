module MegaMine.Shared {

    @service("megamine", "MegaMine.Shared.Profile")
    @inject("$http")
    export class Profile {

        public userId: string = "1";
        public firstName: string = undefined;
        public lastName: string = undefined;
        public fullName: string = undefined;
        public userName: string = undefined;
        public companyId: number = undefined;
        public companies: Models.ICompanyModel[] = [];
        public adminRoles: string[] = [];
        public claims: Models.IClaimModel[] = [];
        public menu: Models.IMenuModel[] = [];
        public isAuthenticated: boolean = false;


        constructor(private $http: ng.IHttpService) {
        }

        public populate(data: Models.IProfileModel): void {
            let self: Profile = this;
            self.userId = data.userId;
            self.firstName = data.firstName;
            self.lastName = data.lastName;
            self.fullName = data.fullName;
            self.userName = data.userName;
            self.companyId = data.companyId;
            self.companies = data.companies;
            self.adminRoles = data.adminRoles;
            self.claims = data.claims;
            self.isAuthenticated = true;
            self.menu.splice(0, self.menu.length);
            angular.extend(self.menu, data.menu);
        };

        public logout(): void {
            let self: Profile = this;

            self.isAuthenticated = false;
        };

    public isAuthorized(authorizeClaims: string[]): boolean {
        let self: Profile = this;

        let response: boolean = false;

        for (let claimCounter: number = 0; claimCounter < authorizeClaims.length; claimCounter++) {
            let arr: string[] = authorizeClaims[claimCounter].split(":");
            let claimModule: string = arr[0];
            let claim: string = arr[1];
            if (self.adminRoles.indexOf(claimModule + "Admin") === -1) {
                for (let counter: number = 0; counter < self.claims.length; counter++) {
                    if (self.claims[counter].claimType === claimModule && self.claims[counter].claimValue === claim) {
                        response = true;
                        break;
                    }
                }
            } else {
                response = true;
            }

            if (response) {
                break;
            }
        }

        return response;
    }

    public get(): ng.IHttpPromise<Models.IProfileModel> {
        let self: Profile = this;

        return self.$http.get<Models.IProfileModel>("/api/account/profileget")
            .then(function (data: Models.IProfileModel): Models.IProfileModel {
                self.populate(data);
                return data;
            });
        }
    }
}

