//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleTypeEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity VehicleType
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Lib.Entities.Fleet
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("VehicleType")]
    public class VehicleTypeEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleTypeId { get; set; }

        public string VehicleTypeName { get; set; }

        public string VehicleTypeDescription { get; set; }
    }
}
