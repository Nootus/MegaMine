//-------------------------------------------------------------------------------------------------
// <copyright file="MachineModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Machine details DTO
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Models
{
    public class MachineModel
    {
        public int MachineId { get; set; }

        public int BladeId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string BladeName { get; set; }
    }
}
