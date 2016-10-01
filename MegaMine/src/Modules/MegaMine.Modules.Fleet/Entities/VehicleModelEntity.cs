//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleModelEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for VehicleModel
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("VehicleModel")]
    public class VehicleModelEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleModelId { get; set; }

        public int VehicleManufacturerId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
