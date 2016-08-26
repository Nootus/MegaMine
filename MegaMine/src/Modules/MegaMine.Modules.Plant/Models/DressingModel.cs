//-------------------------------------------------------------------------------------------------
// <copyright file="DressingModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Dressing fields
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Models
{
    using System;
    using System.Collections.Generic;

    public class DressingModel
    {
        public int DressingId { get; set; }

        public int MachineId { get; set; }

        public DateTime ProcessDate { get; set; }

        public List<BlockDressingModel> Blocks { get; set; }
    }
}
