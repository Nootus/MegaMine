//-------------------------------------------------------------------------------------------------
// <copyright file="PlantMessages.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Messages shown in the plant module
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Common
{
    public static class PlantMessages
    {
        public const string MachineSaveSuccess = "Machine Info Saved Successfully";
        public const string MachineDeleteSuccess = "Machine Info Deleted Successfully";
        public const string BladeSaveSuccess = "Blade Info Saved Successfully";
        public const string BladeDeleteSuccess = "Blade Info Deleted Successfully";
        public const string OperatorSaveSuccess = "Operator Info Saved Successfully";
        public const string OperatorDeleteSuccess = "Operator Info Deleted Successfully";
        public const string DressingSaveSuccess = "Block Dressing data saved successfully";
        public const string DressingError = "Please fix the errors";
        public const string BlockNumbersInvalid = "Invalid block numbers: {0}";
        public const string BlockRequired = "There should be at least one block";
        public const string StoppageTimeRangeInvalid = "Invalid start and end time for Stoppages";
        public const string OperatorTimeRangeInvalid = "Invalid start and end time for Operators";
        public const string OperatorRequired = "There should be at least one operator";
    }
}
