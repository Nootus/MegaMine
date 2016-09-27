//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleServiceSparePartEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for VehicleServiceSparePart
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Lib.Entities.Fleet
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("VehicleServiceSparePart")]
    public class VehicleServiceSparePartEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleServiceSparePartId { get; set; }

        public int VehicleServiceId { get; set; }

        public int ConsumedUnits { get; set; }

        public int SparePartId { get; set; }

        public VehicleServiceEntity VehicleService { get; set; }
    }
}
