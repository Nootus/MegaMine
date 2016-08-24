//-------------------------------------------------------------------------------------------------
// <copyright file="ProductSummarySearchModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Model for search criteria
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    using System;

    public class ProductSummarySearchModel
    {
        public int[] QuarryIds { get; set; }

        public int[] ProductTypeIds { get; set; }

        public int[] MaterialColourIds { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}
