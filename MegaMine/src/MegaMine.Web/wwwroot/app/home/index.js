var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Home;
    (function (Home) {
        let Index = class Index {
            constructor($scope, profile, navigation, changePasswordDialog) {
                this.$scope = $scope;
                this.profile = profile;
                this.navigation = navigation;
                this.changePasswordDialog = changePasswordDialog;
                this.startvalue = 0;
                this.buffervalue = 0;
                this.collapseMenu = false;
                this.currentMenuItem = {};
            }
            showChangePasswordDialog(ev) {
                this.changePasswordDialog.viewDialog(ev);
            }
            changeCompany() {
                const self = this;
                //getting profile for the changed company
                self.profile.get();
                self.navigation.gotoDashboard();
                self.resetMenu();
                return true;
            }
            resetMenu() {
                const self = this;
                //self.$scope.accordion_data.current = -1;
                self.currentMenuItem.pageId = -1;
            }
            menuClick(item) {
                angular.extend(this.currentMenuItem, item);
            }
            toggleMenu() {
                this.collapseMenu = !this.collapseMenu;
            }
        };
        Index = __decorate([
            MegaMine.controller("megamine", "MegaMine.Home.Index"),
            MegaMine.inject("$scope", "MegaMine.Shared.Profile", "MegaMine.Shared.Navigation", "MegaMine.Account.ChangePasswordDialog")
        ], Index);
        Home.Index = Index;
    })(Home = MegaMine.Home || (MegaMine.Home = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Index.js.map