//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleDriverEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for VehicleDriver
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Lib.Entities.Fleet
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("VehicleDriver")]
    public class VehicleDriverEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int   VehicleDriverId { get; set; }

        public string  DriverName { get; set; }

        public string  Contact { get; set; }

        public string  PhotoUrl { get; set; }
    }
}
