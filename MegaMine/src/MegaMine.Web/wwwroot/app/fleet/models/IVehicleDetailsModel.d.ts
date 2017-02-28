declare module MegaMine.Fleet.Models {
    interface IVehicleDetailsModel {
        vehicleId: number;
        registrationNumber: string;
        vehicleType: string;
        manufacturer: string;
        vehicleModel: string;
        ownership: string;
        driver: string;
        vehicleDriverId: number;
        vehicleDriverAssignmentId: number;
        fuelAverage: number;
        fuelResetDate: Date;
        serviceCost: number;
        serviceDate: Date;
        serviceRecord: IVehicleServiceModel[];

        // ui fields
        vehicleTypeId: number;
        ownershipId: number;
        vehicleManufacturerId: number;
        vehicleModelId: number;
    }
}