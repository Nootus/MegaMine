//-------------------------------------------------------------------------------------------------
// <copyright file="StockModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  StockModel to contain the stock details
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    public class StockModel : MaterialModel
    {
        public string ProductType { get; set; }

        public string MaterialColour { get; set; }

        public string Texture { get; set; }

        public string Quarry { get; set; }
    }
}
