//-------------------------------------------------------------------------------------------------
// <copyright file="ManufacturerDetailsModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Manufacturer information along with available Models
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Models
{
    using System.Collections.Generic;

    public class ManufacturerDetailsModel
    {
        public int VehicleManufacturerId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<VehicleManufactureModelModel> Models { get; set; }
    }
}
