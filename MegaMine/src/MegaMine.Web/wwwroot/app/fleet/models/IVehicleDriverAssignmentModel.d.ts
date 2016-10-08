declare module MegaMine.Fleet.Models {
    interface IVehicleDriverAssignmentModel {
        vehicleDriverAssignmentId: number;
        vehicleDriverId: number;
        driverName: string;
        vehicleId: number;
        assignmentStartDate: Date;
        assignmentEndDate: Date;
    }
}