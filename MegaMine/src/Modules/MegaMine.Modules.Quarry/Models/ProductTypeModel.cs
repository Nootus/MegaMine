//-------------------------------------------------------------------------------------------------
// <copyright file="ProductTypeModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Product Type details
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    public class ProductTypeModel
    {
        public int ProductTypeId { get; set; }

        public string ProductTypeName { get; set; }

        public string ProductTypeDescription { get; set; }

        public int ProcessTypeId { get; set; }

        public string Formula { get; set; }

        public int? FormulaOrder { get; set; }
    }
}
