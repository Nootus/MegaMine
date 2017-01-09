module MegaMine {

    @config("megamine")
    @inject("$stateProvider", "$windowProvider", "$urlRouterProvider", "$locationProvider")
    class Route {
        constructor($stateProvider: ng.ui.IStateProvider, $windowProvider: ng.IServiceProvider,
            $urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider: ng.ILocationProvider) {
            let virtualPath: string = $windowProvider.$get().virtualDirectory;

            $stateProvider
                .state("dashboard", {
                    url: virtualPath + "/",
                    title: "Dashboard",
                    previousState: "",
                    templateUrl: "/app/dashboard/dashboard.html",
                    controller: Dashboard.Dashbard,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Dashboard.DashboardService", function (dashboardService: Dashboard.DashboardService):
                            ng.IHttpPromise<Shared.Models.IAjaxDataModel<void>> {
                            return dashboardService.resolve();
                        }]
                    }
                })
                .state("login", {
                    url: virtualPath + "/login",
                    title: "Login",
                    previousState: "",
                    templateUrl: "/app/account/login.html",
                    controller: Account.Login,
                    controllerAs: "vm"
                })
                .state("logout", {
                    url: virtualPath + "/logout",
                    title: "Login",
                    previousState: "",
                    templateUrl: "/app/account/login.html",
                    controller: Account.Login,
                    controllerAs: "vm",
                    resolve: {
                        resolveModel: ["MegaMine.Shared.Profile", "MegaMine.Account.AccountService",
                            function (profile: Shared.Profile, accountService: Account.AccountService): ng.IHttpPromise<void> {
                                profile.logout();
                                return accountService.logout();
                            }]
                    }
                })

                .state("myapp", {
                    url: virtualPath + "/myapp",
                    title: "MyApp",
                    previousState: "",
                    template: "<my-app></my-app>",

                });


            $locationProvider.html5Mode(true);

            $urlRouterProvider.when("", "/");
            $urlRouterProvider.when(virtualPath + "/", virtualPath);
        }
    }
}