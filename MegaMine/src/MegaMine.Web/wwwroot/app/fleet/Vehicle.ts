module MegaMine.Fleet {

    @controller("megamine", "MegaMine.Fleet.VehicleList")
    @inject("MegaMine.Fleet.FleetService", "MegaMine.Fleet.VehicleDialog", "MegaMine.Shared.Navigation")
    export class Vehicle {

        public model: Models.IVehicleDetailsModel = <Models.IVehicleDetailsModel>{};
        public menuItems: Models.IVehicleMenuItem[] = [];

        constructor(private fleetService: FleetService, private vehicleDialog: VehicleDialog, private navigation: Shared.Navigation) {
            const self: Vehicle = this;

            self.model = self.fleetService.vehicle;
            self.menuInitialize();
        }

        public viewVehicle(ev: ng.IAngularEvent) {
            const self: Vehicle = this;
            self.vehicleDialog.viewDialog(self.model, Shared.Dialog.Models.DialogMode.save, ev);
        }

        public menuInitialize(): void {
            const self: Vehicle = this;

            // setting menu item for the first time
            if (self.navigation.vehicleMenuItems.length === 0) {
                self.navigation.populateVehicleMenu(self.model.vehicleId);
            }
            self.menuItems = self.navigation.vehicleMenuItems;

            // setting the first menu item if no menu item is selected
            let menuSelected: boolean = false;
            angular.forEach(self.menuItems, function (item: Models.IVehicleMenuItem): void {
                if (item.cssClass === "highlight") {
                    menuSelected = true;
                }});
            if (!menuSelected) {
                self.menuItems[0].cssClass = "highlight";
            }
        }

        public menuSelect(menuItem: Models.IVehicleMenuItem): void {
            const self: Vehicle = this;
            angular.forEach(self.menuItems, function (item: Models.IVehicleMenuItem): void {
                item.cssClass = "";
            });
            menuItem.cssClass = "highlight";
        }
    }
}
