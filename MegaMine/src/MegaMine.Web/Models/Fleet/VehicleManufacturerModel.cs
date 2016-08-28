//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleManufacturerModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Vehicle Manufacturer DTO
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Models.Fleet
{
    public class VehicleManufacturerModel
    {
        public int VehicleManufacturerId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
