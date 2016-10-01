//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleTripModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DTO for VehicleTrip
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Models
{
    using System;

    public class VehicleTripModel
    {
        public int VehicleTripId { get; set; }

        public int VehicleId { get; set; }

        public string VehicleTripName { get; set; }

        public int VehicleDriverId { get; set; }

        public decimal? OdometerStart { get; set; }

        public decimal? OdometerEnd { get; set; }

        public DateTime StartingTime { get; set; }

        public DateTime ReachingTime { get; set; }
    }
}
