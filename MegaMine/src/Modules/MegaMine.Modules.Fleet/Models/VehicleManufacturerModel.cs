//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleManufacturerModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Vehicle Manufacturer DTO
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Models
{
    public class VehicleManufacturerModel
    {
        public int VehicleManufacturerId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
