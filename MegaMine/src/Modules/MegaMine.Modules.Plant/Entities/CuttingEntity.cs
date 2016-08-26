//-------------------------------------------------------------------------------------------------
// <copyright file="CuttingEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for Cutting
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("Cutting", Schema = "plant")]
    public class CuttingEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CuttingId { get; set; }

        public int MachineId { get; set; }

        public DateTime ProcessDate { get; set; }
    }
}
