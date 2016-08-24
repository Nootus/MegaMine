//-------------------------------------------------------------------------------------------------
// <copyright file="MaterialColourModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Colour of each block or material
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    public class MaterialColourModel
    {
        public int MaterialColourId { get; set; }

        public string ColourName { get; set; }

        public string ColourDescription { get; set; }
    }
}
