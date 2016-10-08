declare module MegaMine.Fleet.Models {
    interface IVehicleTripModel {
        vehicleTripId: number;
        vehicleId: number;
        vehicleTripName: string;
        vehicleDriverId: number;
        odometerStart: number;
        odometerEnd: number;
        startingTime: Date;
        reachingTime: Date;
    }
}