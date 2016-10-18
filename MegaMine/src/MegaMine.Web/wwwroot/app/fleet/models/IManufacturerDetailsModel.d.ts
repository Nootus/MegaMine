declare module MegaMine.Fleet.Models {
    interface IManufacturerDetailsModel {
        vehicleManufacturerId: number;
        name: string;
        description: string;
        models: IVehicleManufacturerModelModel[];
    }
}