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
        let FleetUtility = class FleetUtility {
            watchManufacturerModel(scope, model) {
                const self = this;
                self.vehicleModel = model;
                scope.$watch(function (scope) {
                    return model.vehicleManufacturerId;
                }, self.bindModelDropDown);
            }
            bindModelDropDown(manufacturerId, oldmanufacturerId) {
                const self = this;
                if (self.vehicleModel.modelList === undefined) {
                    self.vehicleModel.modelList = [];
                }
                let modelList = self.vehicleModel.modelList;
                let vehicleModelList = self.vehicleModel.vehicleModelList;
                if (vehicleModelList === undefined) {
                    return;
                }
                modelList.splice(0, modelList.length);
                for (let counter = 0; counter < vehicleModelList.length; counter++) {
                    if (vehicleModelList[counter].vehicleManufacturerId === manufacturerId) {
                        modelList.push({ key: vehicleModelList[counter].vehicleModelId, item: vehicleModelList[counter].name });
                    }
                }
                if (manufacturerId === oldmanufacturerId) {
                    return;
                }
                if (modelList.length > 0) {
                    self.vehicleModel.vehicleModelId = modelList[0].key;
                }
                else {
                    self.vehicleModel.vehicleModelId = undefined;
                }
            }
        };
        FleetUtility = __decorate([
            MegaMine.service("megamine", "MegaMine.Fleet.FleetUtility")
        ], FleetUtility);
        Fleet.FleetUtility = FleetUtility;
    })(Fleet = MegaMine.Fleet || (MegaMine.Fleet = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=FleetUtility.js.map