//-------------------------------------------------------------------------------------------------
// <copyright file="MaterialColourEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Object for the material colour
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("MaterialColour", Schema = "quarry")]
    public class MaterialColourEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaterialColourId { get; set; }

        public string ColourName { get; set; }

        public string ColourDescription { get; set; }
    }
}
