module MegaMine.Fleet {

    @service("megamine", "MegaMine.Fleet.FleetUtility")
    export class FleetUtility {
        private vehicleModel: Models.IVehicleModel;
        public watchManufacturerModel(scope: ng.IScope, model: Models.IVehicleModel): void {
            const self: FleetUtility = this;
            self.vehicleModel = model;
            scope.$watch(function (scope: ng.IScope): number {
                return model.vehicleManufacturerId;
                }
                , self.bindModelDropDown);
        }

        public bindModelDropDown (manufacturerId: number, oldmanufacturerId: number): void {
            const self: FleetUtility = this;
            if (self.vehicleModel.modelList === undefined) {
                self.vehicleModel.modelList = [];
            }

            let modelList: Shared.Models.IListItem<number, string>[] = self.vehicleModel.modelList;
            let vehicleModelList: Models.IVehicleManufacturerModelModel[] = self.vehicleModel.vehicleModelList;
            if (vehicleModelList === undefined) {
                return;
            }

            modelList.splice(0, modelList.length);

            for (let counter: number = 0; counter < vehicleModelList.length; counter++) {
                if (vehicleModelList[counter].vehicleManufacturerId === manufacturerId) {
                    modelList.push({ key: vehicleModelList[counter].vehicleModelId, item: vehicleModelList[counter].name });
                }
            }

            if (manufacturerId === oldmanufacturerId) {
                return;
            }

            if (modelList.length > 0) {
                self.vehicleModel.vehicleModelId = modelList[0].key;
            } else {
                self.vehicleModel.vehicleModelId = undefined;
            }
        }
    }
}