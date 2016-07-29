module MegaMine.Shared {

    "use strict";
    @service("megamine", "MegaMine.Shared.Constants")
    @inject()
    export class Constants {

        public dateFormat: string = "dd/MM/yyyy";
        public dateTimeFormat: string = "dd/MM/yyyy hh:mm a";
        public momentDateTimeFormat: string = "L LT";
        public devEnvironment: string = "development";

        public enum = {
            dialogMode: { view: 0, save: 1, delete: 2 },
            buttonType: { view: 0, edit: 1, delete: 2 },
            viewType: { dashboard: 0, grid: 1, list: 2, dashboardOnly: 3 }
        };
    }
}
