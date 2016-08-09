module MegaMine.Dashboard {

    @controller("megamine", "MegaMine.Dashboard.Dashboard")
    @inject("MegaMine.Dashboard.DashboardService")
    export class Dashbard {

        public dashboard: Widget.Models.IDashboardModel<Dashbard, void>;

        constructor(private dashboardService: DashboardService) {
            const self: Dashbard = this;
            self.dashboard = {
                header: "Quarry Dashboard",
                context: self,
                widgets: {
                    allWidgets: self.dashboardService.widgets.allWidgets,
                    pageWidgets: self.dashboardService.widgets.pageWidgets
                }
            };
        }


    }
}
