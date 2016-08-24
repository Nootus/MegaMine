//-------------------------------------------------------------------------------------------------
// <copyright file="YardEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Yard details
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("Yard", Schema = "quarry")]
    public class YardEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int YardId { get; set; }

        public string YardName { get; set; }

        public string Location { get; set; }

        public int? QuarryId { get; set; }

        public QuarryEntity Quarry { get; set; }
    }
}
