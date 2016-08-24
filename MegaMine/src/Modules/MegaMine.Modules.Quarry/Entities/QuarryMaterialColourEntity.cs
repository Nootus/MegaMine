//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryMaterialColourEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Object for colour of each Material
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("QuarryMaterialColour", Schema = "quarry")]
    public class QuarryMaterialColourEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuarryMaterialColourId { get; set; }

        public int QuarryId { get; set; }

        public int MaterialColourId { get; set; }

        public virtual QuarryEntity Quarry { get; set; }
    }
}
