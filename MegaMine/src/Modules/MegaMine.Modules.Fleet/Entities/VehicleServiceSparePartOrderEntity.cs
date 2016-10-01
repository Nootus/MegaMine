//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleServiceSparePartOrderEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for VehicleServiceSparePartOrder
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("VehicleServiceSparePartOrder")]
    public class VehicleServiceSparePartOrderEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleServiceSparePartOrderId { get; set; }

        public int VehicleServiceId { get; set; }

        public int ConsumedUnits { get; set; }

        public int SparePartOrderId { get; set; }

        public VehicleServiceEntity VehicleService { get; set; }
    }
}
