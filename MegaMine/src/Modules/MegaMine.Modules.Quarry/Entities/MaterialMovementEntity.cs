//-------------------------------------------------------------------------------------------------
// <copyright file="MaterialMovementEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Object for Material Movement. This is used only for reporting
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("MaterialMovement", Schema = "quarry")]
    public class MaterialMovementEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaterialMovementId { get; set; }

        public int MaterialId { get; set; }

        public int FromYardId { get; set; }

        public int ToYardId { get; set; }

        public DateTime MovementDate { get; set; }

        public bool CurrentInd { get; set; }

        public MaterialEntity Material { get; set; }
    }
}
