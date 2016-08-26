//-------------------------------------------------------------------------------------------------
// <copyright file="MachineOperatorModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Operators of the machine
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Models
{
    using System;
    using MegaMine.Core.Models;

    public class MachineOperatorModel : ITimeRange
    {
        public int MachineOperatorId { get; set; }

        public int MachineId { get; set; }

        public int OperatorId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
    }
}
