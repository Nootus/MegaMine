declare module MegaMine.Fleet.Models {
    interface IVehicleListModel {
        vehicleId: number;
        registrationNumber: string;
        vehicleType: string;
        vehicleModel: string;
        ownership: string;
        fuelAverage: number;
        driver: string;
        lastServiceDate: Date;
        totalServiceCost: number;

        // for dialog
        manufacturer: string;
        vehicleTypeId: number;
        ownershipId: number;
        vehicleManufacturerId: number;
        vehicleModelId: number;
    }
}