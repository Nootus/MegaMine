//-------------------------------------------------------------------------------------------------
// <copyright file="ProcessTypeEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Object for ProcessType
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("ProcessType", Schema = "quarry")]
    public class ProcessTypeEntity : BaseEntity
    {
        [Key]
        public int ProcessTypeId { get; set; }

        public string ProcessTypeName { get; set; }
    }
}
