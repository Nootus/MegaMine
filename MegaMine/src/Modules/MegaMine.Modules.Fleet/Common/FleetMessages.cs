//-------------------------------------------------------------------------------------------------
// <copyright file="FleetMessages.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Messages for the Fleet module
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Shared
{
    public static class FleetMessages
    {
        // master tables
        public const string VehicleTypeSaveSuccess = "Vehicle Type Saved Successfully";
        public const string VehicleTypeDeleteSuccess = "Vehicle Type Deleted Successfully";

        public const string VehicleManufacturerSaveSuccess = "Manufacturer Saved Successfully";
        public const string VehicleManufacturerDeleteSuccess = "Manufacturer Deleted Successfully";
        public const string VehicleModelSaveSuccess = "Vehicle Model Saved Successfully";
        public const string VehicleModelDeleteSuccess = "Vehicle Model Deleted Successfully";

        // Driver
        public const string DriverSaveSuccess = "Driver Saved Successfully";
        public const string DriverDeleteSuccess = "Driver Deleted Successfully";

        // vehicle Messages
        public const string VehicleServiceSaveSuccess = "Vehicle Service Saved Successfully";
        public const string VehicleSaveSuccess = "Vehicle Saved Successfully";
        public const string DriveAssessmentError = "Driver is already assigned. Cannot assign another driver";
        public const string FuelSaveSuccess = "Fuel Saved Successfully";
        public const string FuelInvalidOdometer = "Invalid Odometer or Date. There is already a higher Odometer reading";
        public const string FuelResetSuccess = "Reset Fuel Average Successful";
        public const string VehicleDriverSaveSuccess = "Driver record Saved Successfully";
        public const string VehicleTripSaveSuccess = "Vehicle trip record saved Successfully";
        public const string SparePartOrderSaveSuccess = "Spare Part Order Saved Successfully";
        public const string SparePartSaveSuccess = "Spare Part Saved Successfully";
        public const string DriveAssessmentDateError = "Driver assignment start date should not be greater than the end date.";
    }
}
