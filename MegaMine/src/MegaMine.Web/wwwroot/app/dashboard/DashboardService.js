var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Dashboard;
    (function (Dashboard) {
        let DashboardService = class DashboardService {
            constructor($http) {
                this.$http = $http;
                this.widgets = {};
            }
            resolve() {
                const self = this;
                return self.$http.get("/api/quarry/dashboard")
                    .then(function (data) {
                    angular.extend(self.widgets, data.dashboard);
                    return data;
                });
            }
        };
        DashboardService = __decorate([
            MegaMine.service("megamine", "MegaMine.Dashboard.DashboardService"),
            MegaMine.inject("$http")
        ], DashboardService);
        Dashboard.DashboardService = DashboardService;
    })(Dashboard = MegaMine.Dashboard || (MegaMine.Dashboard = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=DashboardService.js.map