//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Contains Vehicle details and the corresponding drop down lists
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Models.Fleet
{
    using System.Collections.Generic;
    using MegaMine.Core.Models;

    public class VehicleModel
    {
        public int VehicleId { get; set; }

        public string RegistrationNumber { get; set; }

        public string VehicleType { get; set; }

        public int VehicleTypeId { get; set; }

        public int VehicleManufacturerId { get; set; }

        public int VehicleModelId { get; set; }

        public List<ListItem<int, string>> VehicleTypeList { get; set; }

        public List<ListItem<int, string>> ManufacturerList { get; set; }

        public List<VehicleManufactureModelModel> VehicleModelList { get; set; }
    }
}
