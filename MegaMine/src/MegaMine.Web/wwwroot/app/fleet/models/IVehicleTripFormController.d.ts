declare module MegaMine.Fleet.Models {
    export interface IVehicleTripFormController extends ng.IFormController {
        odometerStart: ng.INgModelController;
        odometerEnd: ng.INgModelController;
        startingTime: ng.INgModelController;
        reachingTime: ng.INgModelController;
    }
}
