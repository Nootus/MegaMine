//-------------------------------------------------------------------------------------------------
// <copyright file="FuelModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Fuel for the Vehicle
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Models.Fleet
{
    using System;

    public class FuelModel
    {
        public int VehicleFuelId { get; set; }

        public int VehicleId { get; set; }

        public Decimal Odometer { get; set; }

        public Decimal Quantity { get; set; }

        public DateTime FuelDate { get; set; } 
    }
}
