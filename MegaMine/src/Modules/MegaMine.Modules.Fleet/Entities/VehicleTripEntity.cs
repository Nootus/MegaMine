//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleTripEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity VehicleTrip
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("VehicleTrip", Schema = "fleet")]
    public class VehicleTripEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleTripId { get; set; }

        public string VehicleTripName { get; set; }

        public int VehicleId { get; set; }

        public int VehicleDriverId { get; set; }

        public decimal? OdometerStart { get; set; }

        public decimal? OdometerEnd { get; set; }

        public DateTime StartingTime { get; set; }

        public DateTime ReachingTime { get; set; }
    }
}
