//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleManufactureModelModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Models within a Manufacturer
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Models.Fleet
{
    public class VehicleManufactureModelModel
    {
        public int VehicleModelId { get; set; }

        public int VehicleManufacturerId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
