var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    let Route = class Route {
        constructor($stateProvider, $windowProvider, $urlRouterProvider, $locationProvider) {
            let virtualPath = $windowProvider.$get().virtualDirectory;
            $stateProvider
                .state("dashboard", {
                url: virtualPath + "/",
                title: "Dashboard",
                previousState: "",
                templateUrl: "/app/dashboard/dashboard.html",
                controller: MegaMine.Dashboard.Dashbard,
                controllerAs: "vm",
                resolve: {
                    resolveModel: ["MegaMine.Dashboard.DashboardService", function (dashboardService) {
                            return dashboardService.resolve();
                        }]
                }
            })
                .state("login", {
                url: virtualPath + "/login",
                title: "Login",
                previousState: "",
                templateUrl: "/app/account/login.html",
                controller: MegaMine.Account.Login,
                controllerAs: "vm"
            })
                .state("logout", {
                url: virtualPath + "/logout",
                title: "Login",
                previousState: "",
                templateUrl: "/app/account/login.html",
                controller: MegaMine.Account.Login,
                controllerAs: "vm",
                resolve: {
                    resolveModel: ["MegaMine.Shared.Profile", "accountService",
                        function (profile, accountService) {
                            profile.logout();
                            return accountService.logout();
                        }]
                }
            });
            $locationProvider.html5Mode(true);
            $urlRouterProvider.when("", "/");
            $urlRouterProvider.when(virtualPath + "/", virtualPath);
        }
    };
    Route = __decorate([
        MegaMine.config("megamine"),
        MegaMine.inject("$stateProvider", "$windowProvider", "$urlRouterProvider", "$locationProvider")
    ], Route);
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=AppRoute.js.map