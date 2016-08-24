//-------------------------------------------------------------------------------------------------
// <copyright file="YardModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Yard details to pass to UI
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    public class YardModel
    {
        public int YardId { get; set; }

        public string YardName { get; set; }

        public string Location { get; set; }

        public int? QuarryId { get; set; }
    }
}
