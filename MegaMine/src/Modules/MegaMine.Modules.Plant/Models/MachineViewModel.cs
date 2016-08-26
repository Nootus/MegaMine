//-------------------------------------------------------------------------------------------------
// <copyright file="MachineViewModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  ViewModel for Machines and Blades drop down
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Models
{
    using System.Collections.Generic;
    using MegaMine.Core.Models;

    public class MachineViewModel
    {
        public List<MachineModel> Machines { get; set; }

        public List<ListItem<int, string>> Blades { get; set; }
    }
}
