module MegaMine.Home {

    @controller("megamine", "MegaMine.Home.Index")
    @inject("MegaMine.Shared.Profile", "MegaMine.Shared.Navigation", "MegaMine.Account.ChangePasswordDialog")
    export class Index {

        public startvalue: number = 0;
        public buffervalue: number = 0;
        public collapseMenu: boolean = false;
        public currentMenuItem: MegaMine.Shared.Models.IMenuModel =  <MegaMine.Shared.Models.IMenuModel>{};


        constructor(public profile: MegaMine.Shared.Profile, public navigation: MegaMine.Shared.Navigation,
            private changePasswordDialog: MegaMine.Account.ChangePasswordDialog) {
        }

        public showChangePasswordDialog(ev: ng.IAngularEvent): void {
            this.changePasswordDialog.viewDialog(ev);
        }

        public changeCompany(): boolean {
            const self: Index = this;
            // getting profile for the changed company
            self.profile.get();
            self.navigation.gotoDashboard();
            self.resetMenu();
            return true;
        }

        private resetMenu(): void {
            const self: Index = this;
            self.currentMenuItem.pageId = -1;
        }

        public menuClick(item: Shared.Models.IMenuModel): void {
            angular.extend(this.currentMenuItem, item);
        }

        public toggleMenu(): void {
            this.collapseMenu = !this.collapseMenu;
        }
    }
}
