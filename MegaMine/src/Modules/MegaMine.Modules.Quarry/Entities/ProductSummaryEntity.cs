//-------------------------------------------------------------------------------------------------
// <copyright file="ProductSummaryEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Stored procedure returned object, used for reporting
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Entities
{
    using System.ComponentModel.DataAnnotations;

    public class ProductSummaryEntity
    {
        [Key]
        public string Id { get; set; }

        public int ProductTypeId { get; set; }

        public string ProductTypeName { get; set; }

        public int QuarryId { get; set; }

        public string QuarryName { get; set; }

        public int MaterialColourId { get; set; }

        public string ColourName { get; set; }

        public int ProcessTypeId { get; set; }

        public string ProcessTypeName { get; set; }

        public decimal MaterialQuantityWeight { get; set; }
    }
}
