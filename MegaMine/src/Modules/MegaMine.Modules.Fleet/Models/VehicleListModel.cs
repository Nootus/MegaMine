//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleListModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  List of vehicles to show them in the grid
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Models
{
    using System;

    public class VehicleListModel
    {
        public int VehicleId { get; set; }

        public string RegistrationNumber { get; set; }

        public string VehicleType { get; set; }

        public string VehicleModel { get; set; }

        public decimal? FuelAverage { get; set; }

        public string Driver { get; set; }

        public DateTime? LastServiceDate { get; set; }

        public decimal TotalServiceCost { get; set; }
    }
}
