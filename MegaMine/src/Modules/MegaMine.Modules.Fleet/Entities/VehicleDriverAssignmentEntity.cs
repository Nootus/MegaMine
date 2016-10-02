//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleDriverAssignmentEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for VehicleDriverAssignment
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("VehicleDriverAssignment", Schema = "fleet")]
    public class VehicleDriverAssignmentEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleDriverAssignmentId { get; set; }

        public int VehicleDriverId { get; set; }

        public int VehicleId { get; set; }

        public DateTime AssignmentStartDate { get; set; }

        public DateTime? AssignmentEndDate { get; set; }
    }
}
