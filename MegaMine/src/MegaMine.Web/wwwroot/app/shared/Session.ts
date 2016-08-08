module MegaMine.Shared {

    @service("megamine", "MegaMine.Shared.Session")
    @inject("$window", "toastr", "MegaMine.Shared.Navigation", "MegaMine.Shared.Profile", "MegaMine.Shared.Constants")
    export class Session {

        constructor(private $window: ng.IWindowService, private toastr: any, public navigation: Navigation,
            private profile: Profile, private constants: Constants) {
        }

        public initialize(): void {
            const self: Session = this;

            self.toastr.options.positionClass = "toast-bottom-right";
            self.toastr.options.backgroundpositionClass = "toast-bottom-right";

            self.navigation.initialize();

            // global values
            self.$window.navigation = self.navigation;
            self.$window.profile = self.profile;
            self.$window.constants = self.constants;
        }
    }
}

