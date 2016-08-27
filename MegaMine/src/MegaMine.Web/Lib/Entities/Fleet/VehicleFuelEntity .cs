//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleFuelEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for VehicleFuel
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Lib.Entities.Fleet
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("VehicleFuel")]
    public class VehicleFuelEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleFuelId { get; set; }

        public int VehicleId { get; set; }

        public Decimal Odometer { get; set; }

        public Decimal Quantity { get; set; }

        public DateTime FuelDate { get; set; }
    }
}
