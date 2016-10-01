//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleServiceModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DTO for Vehicle Service
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Models
{
    using System;

    public class VehicleServiceModel
    {
        public int VehicleServiceId { get; set; }

        public int VehicleId { get; set; }

        public string Compliant { get; set; }

        public DateTime? ServiceDate { get; set; }

        public decimal MiscServiceCost { get; set; }

        public decimal TotalServiceCost { get; set; }

        public string Description { get; set; }
    }
}
