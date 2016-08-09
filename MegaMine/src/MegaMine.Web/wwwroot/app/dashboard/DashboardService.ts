module MegaMine.Dashboard {

    @service("megamine", "MegaMine.Dashboard.DashboardService")
    @inject("$http")
    export class DashboardService {

        public widgets: Widget.Models.IDashboardWidgets = <Widget.Models.IDashboardWidgets>{};

        constructor(private $http: ng.IHttpService) {
        }

        public resolve(): ng.IHttpPromise<Shared.Models.IAjaxDataModel<void>> {
            const self: DashboardService = this;
            return self.$http.get("/api/quarry/dashboard")
                .then(function (data: Shared.Models.IAjaxDataModel<void>):
                            Shared.Models.IAjaxDataModel<void> {
                    angular.extend(self.widgets, data.dashboard);
                    return data;
                });
        }
    }
}
