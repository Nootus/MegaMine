//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleDriverModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  The driver for each vehicle
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Models
{
    public class VehicleDriverModel
    {
        public int VehicleDriverId { get; set; }

        public string DriverName { get; set; }

        public string Contact { get; set; }
    }
}
