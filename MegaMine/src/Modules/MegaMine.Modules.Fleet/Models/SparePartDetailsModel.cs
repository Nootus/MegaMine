//-------------------------------------------------------------------------------------------------
// <copyright file="SparePartDetailsModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Details of each Spare Part
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Models.Fleet
{
    using System.Collections.Generic;

    public class SparePartDetailsModel
    {
        public int SparePartId { get; set; }

        public int Quantity { get; set; }

        public string Name { get; set; }

        public string ManufacturingBrand { get; set; }

        public string Description { get; set; }

        public List<SparePartOrderModel> Orders { get; set; }

        public string VehicleManufacturer { get; set; }

        public string VehicleModel { get; set; }

        public string VehicleType { get; set; }
    }
}
