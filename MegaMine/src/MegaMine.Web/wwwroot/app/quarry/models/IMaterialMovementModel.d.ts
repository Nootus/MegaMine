declare module MegaMine.Quarry.Models {
    interface IMaterialMovementModel {
        materialIds: number[];
        fromYardId: number;
        toYardId: number;
        movementDate: Date;
    }
}