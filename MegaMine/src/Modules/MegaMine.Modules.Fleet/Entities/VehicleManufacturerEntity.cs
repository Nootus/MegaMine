//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleManufacturerEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for VehicleManufacturer
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("VehicleManufacturer", Schema = "fleet")]
    public class VehicleManufacturerEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleManufacturerId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
