//-------------------------------------------------------------------------------------------------
// <copyright file="MachineEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Entity for Machine
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("Machine", Schema = "plant")]
    public class MachineEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MachineId { get; set; }

        public int BladeId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        [ForeignKey("BladeId")]
        public BladeEntity Blade { get; set; }
    }
}
