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
        let Profile = class Profile {
            constructor($http) {
                this.$http = $http;
                this.userId = "1";
                this.firstName = undefined;
                this.lastName = undefined;
                this.fullName = undefined;
                this.userName = undefined;
                this.companyId = undefined;
                this.companies = [];
                this.adminRoles = [];
                this.claims = [];
                this.menu = [];
                this.isAuthenticated = false;
            }
            populate(data) {
                let self = this;
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
            }
            ;
            logout() {
                let self = this;
                self.isAuthenticated = false;
            }
            ;
            isAuthorized(authorizeClaims) {
                let self = this;
                let response = false;
                for (let claimCounter = 0; claimCounter < authorizeClaims.length; claimCounter++) {
                    let arr = authorizeClaims[claimCounter].split(":");
                    let claimModule = arr[0];
                    let claim = arr[1];
                    if (self.adminRoles.indexOf(claimModule + "Admin") === -1) {
                        for (let counter = 0; counter < self.claims.length; counter++) {
                            if (self.claims[counter].claimType === claimModule && self.claims[counter].claimValue === claim) {
                                response = true;
                                break;
                            }
                        }
                    }
                    else {
                        response = true;
                    }
                    if (response) {
                        break;
                    }
                }
                return response;
            }
            get() {
                let self = this;
                return self.$http.get("/api/account/profileget")
                    .then(function (data) {
                    self.populate(data);
                    return data;
                });
            }
        };
        Profile = __decorate([
            MegaMine.service("megamine", "MegaMine.Shared.Profile"),
            MegaMine.inject("$http")
        ], Profile);
        Shared.Profile = Profile;
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Profile.js.map