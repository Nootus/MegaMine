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
        let Dashbard = class Dashbard {
            constructor(dashboardService) {
                this.dashboardService = dashboardService;
                const self = this;
                self.dashboard = {
                    header: "Quarry Dashboard",
                    context: self,
                    widgets: {
                        allWidgets: self.dashboardService.widgets.allWidgets,
                        pageWidgets: self.dashboardService.widgets.pageWidgets
                    }
                };
            }
        };
        Dashbard = __decorate([
            MegaMine.controller("megamine", "MegaMine.Dashboard.Dashboard"),
            MegaMine.inject("MegaMine.Dashboard.DashboardService")
        ], Dashbard);
        Dashboard.Dashbard = Dashbard;
    })(Dashboard = MegaMine.Dashboard || (MegaMine.Dashboard = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Dashboard.js.map