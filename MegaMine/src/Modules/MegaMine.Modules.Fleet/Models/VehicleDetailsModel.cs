//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleDetailsModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DTO for the vehicle details
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Models
{
    using System;
    using System.Collections.Generic;

    public class VehicleDetailsModel
    {
        public int VehicleId { get; set; }

        public string RegistrationNumber { get; set; }

        public string VehicleType { get; set; }

        public string Ownership { get; set; }

        public string Manufacturer { get; set; }

        public string VehicleModel { get; set; }

        public string Driver { get; set; }

        public int? VehicleDriverId { get; set; }

        public int? VehicleDriverAssignmentId { get; set; }

        public decimal? FuelAverage { get; set; }

        public DateTime? FuelResetDate { get; set; }

        public decimal? ServiceCost { get; set; }

        public DateTime? ServiceDate { get; set; }

        public List<VehicleServiceModel> ServiceRecord { get; set; }
    }
}
