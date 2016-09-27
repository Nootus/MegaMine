//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleDriverAssignmentModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Used for Assigning a Driver to a vehicle
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Models.Fleet
{
    using System;

    public class VehicleDriverAssignmentModel
    {
        public int VehicleDriverAssignmentId { get; set; }

        public int VehicleDriverId { get; set; }

        public string DriverName { get; set; }

        public int VehicleId { get; set; }

        public DateTime AssignmentStartDate { get; set; }

        public DateTime? AssignmentEndDate { get; set; }
    }
}
