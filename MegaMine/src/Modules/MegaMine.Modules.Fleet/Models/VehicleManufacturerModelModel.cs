//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleManufacturerModelModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Models within a Manufacturer
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Models
{
    public class VehicleManufacturerModelModel
    {
        public int VehicleModelId { get; set; }

        public int VehicleManufacturerId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
