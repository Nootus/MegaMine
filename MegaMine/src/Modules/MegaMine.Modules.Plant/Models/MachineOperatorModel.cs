using MegaMine.Core.Models;
using System;

namespace MegaMine.Modules.Plant.Models
{
    public class MachineOperatorModel : ITimeRange
    {
        public int MachineOperatorId { get; set; }
        public int MachineId { get; set; }
        public int OperatorId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
