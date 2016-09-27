//-------------------------------------------------------------------------------------------------
// <copyright file="SparePartManufacturerEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for SparePartManufacturer
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Lib.Entities.Fleet
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("SparePartManufacturer")]
    public class SparePartManufacturerEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SparePartManufacturerId { get; set; }

        public int SparePartId { get; set; }

        public int VehicleManufacturerId { get; set; }

        public int VehicleModelId { get; set; }

        public int VehicleTypeId { get; set; }
    }
}
