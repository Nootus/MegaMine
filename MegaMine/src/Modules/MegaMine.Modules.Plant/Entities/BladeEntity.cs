//-------------------------------------------------------------------------------------------------
// <copyright file="BladeEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB entity for Blade
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("Blade", Schema = "plant")]
    public class BladeEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BladeId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
