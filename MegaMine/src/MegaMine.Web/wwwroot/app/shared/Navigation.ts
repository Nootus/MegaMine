module MegaMine.Shared {

    @service("megamine", "MegaMine.Shared.Navigation")
    @inject("$rootScope", "$state", "$window", "$location", "MegaMine.Shared.Profile", "MegaMine.Shared.Utility",
                "MegaMine.Shared.Constants")
    export class Navigation {

        public appTitle: string = "Mega Mine";
        public isLoading: boolean = true;
        public environmentName: string;
        public breadcrumbs: Models.IBreadcrumb[] = [];
        public vehicleMenuItems: any[] = [];

        constructor(private $rootScope: ng.IRootScopeService, private $state: ng.ui.IStateService, private $window: ng.IWindowService,
            private $location: ng.ILocationService, private profile: Profile, private utility: Utility, private constants: Constants) {
            this.environmentName = $window.environmentName;
        }


        public initialize(): void {
            const self: Navigation = this;

            self.$rootScope.navigation = self;
            self.$rootScope.$on("$stateChangeStart",
                function (evt: ng.IAngularEvent, toState: ng.ui.IState, toParams: ng.ui.IStateParamsService,
                    fromState: ng.ui.IState, fromParams: ng.ui.IStateParamsService): void {

                    self.isLoading = true;
                    self.$window.document.title = toState.title + " | " + self.appTitle;

                    // checking whether user is authenticated
                    if (self.profile.isAuthenticated === false && toState.name !== "login") {
                        if (self.environmentName.toLowerCase() === self.constants.devEnvironment) {
                            self.profile.get();
                        } else {
                            evt.preventDefault();
                            self.$state.go("login");
                        }
                    }
                });

            self.$rootScope.$on("$stateChangeSuccess",
                function (evt: ng.IAngularEvent, toState: ng.ui.IState, toParams: ng.ui.IStateParamsService,
                    fromState: ng.ui.IState, fromParams: ng.ui.IStateParamsService): void {

                    self.isLoading = false;

                    if (toState.name === "dashboard") {
                        while (self.breadcrumbs.pop()) {
                            // removing all the breadcrumbs
                        }
                    } else {
                        while (self.breadcrumbs.length > 0) {
                            if (self.breadcrumbs[self.breadcrumbs.length - 1].name === toState.previousState) {
                                break;
                            }
                            self.breadcrumbs.pop();
                        }
                    }

                    // adding the breadcrumbs
                    self.breadcrumbs.push({ name: toState.name, title: toState.title, url: self.$location.path() });
                });

            // window resize
            angular.element(self.$window).on("resize", function (): void {
                self.$rootScope.$broadcast("window_resize");
            });


        }

        public go(stateName: string): void {
            this.$state.go(stateName);
        }

        public gotoDashboard(): void {
            this.$state.go("dashboard");
        }

        public gotoVehicle(vehicleId: number): void {
            const self: Navigation = this;


            let state: string = "vehicle";
            self.populateVehicleMenu(vehicleId); // populating the vehicle menu items
            if (self.vehicleMenuItems.length > 0) {
                state += "." + self.vehicleMenuItems[0].state;
            }
            self.$state.go(state, { vehicleid: vehicleId });
        }

        public gotoSparePart(sparePartId: number): void {
            this.$state.go("sparepart", { sparepartid: sparePartId });
        }

        public gotoManufacturer(manufacturerId: number): void {
            this.$state.go("manufacturer", { manufacturerid: manufacturerId });
        }


        public populateVehicleMenu(vehicleId: number): void {
            const self: Navigation = this;

            self.vehicleMenuItems.splice(0, self.vehicleMenuItems.length);

            if (self.profile.isAuthorized(["Fleet:VehicleServiceView"])) {
                self.vehicleMenuItems.push(self.getVehicleMenuItem(vehicleId, " Service History", "service", "service"));
            }

            if (self.profile.isAuthorized(["Fleet:VehicleFuelView"])) {
                self.vehicleMenuItems.push(self.getVehicleMenuItem(vehicleId, " Fuel History", "fuel", "fuel"));
            }

            if (self.profile.isAuthorized(["Fleet:VehicleDriverView"])) {
                self.vehicleMenuItems.push(self.getVehicleMenuItem(vehicleId, " Driver History", "driver", "driver"));
            }

            if (self.profile.isAuthorized(["Fleet:VehicleTripView"])) {
                self.vehicleMenuItems.push(self.getVehicleMenuItem(vehicleId, " Trip History", "vehicletrip", "trip"));
            }
        }

        private getVehicleMenuItem(vehicleId: number, text: string, url: string, iconCss: string): any {
            const self: Navigation = this;
            let cssClass: string = "";
            let iconCssClass: string = "icon-menu icon-" + iconCss;
            let hash: string = self.utility.routePath("vehicle/" + vehicleId + "/" + url);
            let currentHash: string = self.$state.href(self.$state.current.name, self.$state.params);
            if (hash === currentHash) {
                cssClass = "highlight";
            }
            return { text: text, url: hash, state: url, cssClass: cssClass, iconCssClass: iconCssClass };
        }

    }
}
