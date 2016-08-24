//-------------------------------------------------------------------------------------------------
// <copyright file="ProductTypeEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Object for ProductTypes
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("ProductType", Schema = "quarry")]
    public class ProductTypeEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductTypeId { get; set; }

        public string ProductTypeName { get; set; }

        public string ProductTypeDescription { get; set; }

        public int ProcessTypeId { get; set; }

        public string Formula { get; set; }

        public int? FormulaOrder { get; set; }
    }
}
