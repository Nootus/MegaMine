//-------------------------------------------------------------------------------------------------
// <copyright file="SparePartManufacturerModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Manufacturer for a spare part
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Models
{
    public class SparePartManufacturerModel
    {
        public int SparePartManufacturerId { get; set; }

        public int SparePartId { get; set; }

        public int VehicleManufacturerId { get; set; }

        public int VehicleModelId { get; set; }

        public int VehicleTypeId { get; set; }
    }
}
