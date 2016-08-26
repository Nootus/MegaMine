//-------------------------------------------------------------------------------------------------
// <copyright file="MachineStoppageModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Contains the stopppage details of the machine
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Models
{
    using System;
    using MegaMine.Core.Models;

    public class MachineStoppageModel : ITimeRange
    {
        public int MachineStoppageId { get; set; }

        public int MachineId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Reason { get; set; }
    }
}
