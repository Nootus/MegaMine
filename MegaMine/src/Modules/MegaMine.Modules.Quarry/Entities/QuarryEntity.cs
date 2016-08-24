//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Object for Quarry information
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("Quarry", Schema = "quarry")]
    public class QuarryEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuarryId { get; set; }

        public string QuarryName { get; set; }

        public string Location { get; set; }
    }
}
