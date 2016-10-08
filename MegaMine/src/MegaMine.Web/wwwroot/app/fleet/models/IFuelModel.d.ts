declare module MegaMine.Fleet.Models {
    interface IFuelModel {
        vehicleFuelId: number;
        vehicleId: number;
        odometer: number;
        quantity: number;
        fuelDate: Date;
    }
}