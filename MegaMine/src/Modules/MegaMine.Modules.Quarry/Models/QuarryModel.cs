//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Quarry details to be exchaged between UI and server
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    using System.Collections.Generic;

    public class QuarryModel
    {
        public int QuarryId { get; set; }

        public string QuarryName { get; set; }

        public string Location { get; set; }

        public List<int> ColourIds { get; set; }

        public string Colours { get; set; }
    }
}
