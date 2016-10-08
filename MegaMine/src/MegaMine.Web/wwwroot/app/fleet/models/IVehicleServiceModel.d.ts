declare module MegaMine.Fleet.Models {
    interface IVehicleServiceModel {
        vehicleServiceId: number;
        vehicleId: number;
        compliant: string;
        serviceDate: Date;
        miscServiceCost: number;
        totalServiceCost: number;
        description: string;
    }
}