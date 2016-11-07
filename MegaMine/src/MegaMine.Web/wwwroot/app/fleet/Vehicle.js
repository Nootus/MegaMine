var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Fleet;
    (function (Fleet) {
        let Vehicle = class Vehicle {
            constructor(fleetService, vehicleDialog, navigation) {
                this.fleetService = fleetService;
                this.vehicleDialog = vehicleDialog;
                this.navigation = navigation;
                this.model = {};
                this.menuItems = [];
                const self = this;
                self.model = self.fleetService.vehicle;
                self.menuInitialize();
            }
            viewVehicle(ev) {
                const self = this;
                self.vehicleDialog.viewDialog(self.model, 1 /* save */, ev);
            }
            menuInitialize() {
                const self = this;
                // setting menu item for the first time
                if (self.navigation.vehicleMenuItems.length === 0) {
                    self.navigation.populateVehicleMenu(self.model.vehicleId);
                }
                self.menuItems = self.navigation.vehicleMenuItems;
                // setting the first menu item if no menu item is selected
                let menuSelected = false;
                angular.forEach(self.menuItems, function (item) {
                    if (item.cssClass === "highlight") {
                        menuSelected = true;
                    }
                });
                if (!menuSelected) {
                    self.menuItems[0].cssClass = "highlight";
                }
            }
            menuSelect(menuItem) {
                const self = this;
                angular.forEach(self.menuItems, function (item) {
                    item.cssClass = "";
                });
                menuItem.cssClass = "highlight";
            }
        };
        Vehicle = __decorate([
            MegaMine.controller("megamine", "MegaMine.Fleet.VehicleList"),
            MegaMine.inject("MegaMine.Fleet.FleetService", "MegaMine.Fleet.VehicleDialog", "MegaMine.Shared.Navigation")
        ], Vehicle);
        Fleet.Vehicle = Vehicle;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Vehicle.js.map