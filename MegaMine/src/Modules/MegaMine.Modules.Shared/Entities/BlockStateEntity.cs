//-------------------------------------------------------------------------------------------------
// <copyright file="BlockStateEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  BlockState database table
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Shared.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("BlockState", Schema = "shared")]
    public class BlockStateEntity : BaseEntity
    {
        [Key]
        public int BlockId { get; set; }

        public string BlockNumber { get; set; }

        public int State { get; set; }
    }
}
