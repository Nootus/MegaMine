//-------------------------------------------------------------------------------------------------
// <copyright file="SparePartEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for SparePart
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Lib.Entities.Fleet
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("SparePart")]
    public class SparePartEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SparePartId { get; set; }

        public string SparePartName { get; set; }

        public string SparePartDescription { get; set; }

        public string ManufacturingBrand { get; set; }

        public int AvailableQuantity { get; set; }
    }
}
