//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleDriverEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for VehicleDriver
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("VehicleDriver", Schema = "fleet")]
    public class VehicleDriverEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleDriverId { get; set; }

        public string DriverName { get; set; }

        public string Contact { get; set; }

        public string PhotoUrl { get; set; }
    }
}
