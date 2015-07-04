using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Shared
{
    public static class Messages
    {
        #region Fleet Messages
        public static class Fleet
        {
            //master tables
            public const string VehicleTypeSaveSuccess = "Vehicle Type Saved Successfully";
            public const string VehicleManufacturerSaveSuccess = "Manufacturer Saved Successfully";
            public const string DriverSaveSuccess = "Driver Saved Successfully";

            //vehicle Messages
            public const string VehicleServiceSaveSuccess = "Vehicle Service Saved Successfully";
            public const string VehicleSaveSuccess = "Vehicle Saved Successfully";
            public const string VehicleModelSaveSuccess = "Vehicle Model Saved Successfully";
            public const string DriveAssessmentError = "Driver is already assigned. Cannot assign another driver";
            public const string FuelSaveSuccess = "Fuel Saved Successfully";
            public const string VehicleDriverSaveSuccess = "Driver record Saved Successfully";
            public const string VehicleTripSaveSuccess = "Vehicle trip record saved Successfully";
            public const string SparePartOrderSaveSuccess = "Spare Part Order Saved Successfully";
            public const string SparePartSaveSuccess = "Spare Part Saved Successfully";
            public const string DriveAssessmentDateError = "Driver assignment start date should not be greater than the end date.";

        }
        #endregion
    }
}
