//-------------------------------------------------------------------------------------------------
// <copyright file="OwnershipEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity Ownership
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("Ownership", Schema = "fleet")]
    public class OwnershipEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OwnershipId { get; set; }

        public string OwnershipName { get; set; }

        public string Description { get; set; }
    }
}
