//-------------------------------------------------------------------------------------------------
// <copyright file="DressingViewModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DTO for the dressing page
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Models
{
    using System.Collections.Generic;
    using MegaMine.Core.Models;

    public class DressingViewModel
    {
        public DressingModel Model { get; set; }

        public List<MachineStoppageModel> MachineStoppages { get; set; }

        public List<MachineOperatorModel> MachineOperators { get; set; }

        public List<ListItem<int, string>> Machines { get; set; }

        public List<ListItem<int, string>> Operators { get; set; }
    }
}
