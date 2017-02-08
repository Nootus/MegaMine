declare module MegaMine.Fleet.Models {
    interface IVehicleListModel {
        vehicleId: number;
        registrationNumber: string;
        vehicleType: string;
        vehicleModel: string;
        fuelAverage: number;
        driver: string;
        lastServiceDate: Date;
        totalServiceCost: number;

        // for dialog
        manufacturer: string;
        vehicleTypeId: number;
        vehicleManufacturerId: number;
        vehicleModelId: number;
    }
}