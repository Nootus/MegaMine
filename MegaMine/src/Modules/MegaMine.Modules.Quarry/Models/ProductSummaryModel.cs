//-------------------------------------------------------------------------------------------------
// <copyright file="ProductSummaryModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Details for the product summary report
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    public class ProductSummaryModel
    {
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
