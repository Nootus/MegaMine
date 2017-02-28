declare module MegaMine.Fleet.Models {
    interface IVehicleModel {
        vehicleId: number;
        registrationNumber: string;
        vehicleType: string;
        vehicleTypeId: number;
        ownershipId: number;
        vehicleManufacturerId: number;
        vehicleModelId: number;
        vehicleTypeList: Shared.Models.IListItem<number, string>[];
        ownershipList: Shared.Models.IListItem<number, string>[];
        manufacturerList: Shared.Models.IListItem<number, string>[];
        vehicleModelList: IVehicleManufacturerModelModel[];

        // ui fields
        modelList?: Shared.Models.IListItem<number, string>[];
        vehicleModel: string;
        manufacturer: string;
    }
}