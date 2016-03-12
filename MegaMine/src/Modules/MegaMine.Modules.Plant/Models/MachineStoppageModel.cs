using MegaMine.Core.Models;
using System;

namespace MegaMine.Modules.Plant.Models
{
    public class MachineStoppageModel : ITimeRange
    {
        public int MachineStoppageId { get; set; }
        public int MachineId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Reason { get; set; }
    }
}
