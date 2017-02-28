//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for Vehicle
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("Vehicle", Schema = "fleet")]
    public class VehicleEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleId { get; set; }

        public string RegistrationNumber { get; set; }

        public int VehicleTypeId { get; set; }

        public int VehicleManufacturerId { get; set; }

        public int VehicleModelId { get; set; }

        public int OwnershipId { get; set; }

        public int? VehicleDriverId { get; set; }

        public int? VehicleDriverAssignmentId { get; set; }

        public decimal? FuelAverage { get; set; }

        public DateTime? FuelResetDate { get; set; }

        public DateTime? LastServiceDate { get; set; }

        public decimal TotalServiceCost { get; set; }

        public virtual VehicleTypeEntity VehicleType { get; set; }

        [ForeignKey("VehicleDriverAssignmentId")]
        public virtual VehicleDriverAssignmentEntity VehicleDriverAssignment { get; set; }
    }
}
