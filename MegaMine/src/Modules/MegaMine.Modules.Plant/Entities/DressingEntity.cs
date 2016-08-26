//-------------------------------------------------------------------------------------------------
// <copyright file="DressingEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DressingEntity object
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("Dressing", Schema = "plant")]
    public class DressingEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DressingId { get; set; }

        public int MachineId { get; set; }

        public DateTime ProcessDate { get; set; }
    }
}
