﻿//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleTypeModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DTO for VehicleType
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Models.Fleet
{
    public class VehicleTypeModel
    {
        public int VehicleTypeId { get; set; }

        public string VehicleTypeName { get; set; }

        public string VehicleTypeDescription { get; set; }
    }
}
