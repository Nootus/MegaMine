//-------------------------------------------------------------------------------------------------
// <copyright file="ProductSummaryViewModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Report with dropdown fields
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    using System.Collections.Generic;
    using MegaMine.Core.Models;

    public class ProductSummaryViewModel
    {
        public List<ListItem<int, string>> Quarries { get; set; }

        public List<ListItem<int, string>> ProductTypes { get; set; }

        public List<ListItem<int, string>> Colours { get; set; }

        public List<ProductSummaryModel> Summary { get; set; }
    }
}
