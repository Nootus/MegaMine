//-------------------------------------------------------------------------------------------------
// <copyright file="MaterialViewModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Adding Material screen with drop down values
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    using System.Collections.Generic;
    using MegaMine.Core.Models;

    public class MaterialViewModel
    {
        public List<ProductTypeModel> ProductTypes { get; set; }

        public List<ListItem<int, string>> MaterialColours { get; set; }

        public List<ListItem<int, string>> Quarries { get; set; }

        public List<ListItem<int, string>> Textures { get; set; }

        public List<ListItem<int, string>> ProcessTypes { get; set; }

        public MaterialModel Model { get; set; }
    }
}
