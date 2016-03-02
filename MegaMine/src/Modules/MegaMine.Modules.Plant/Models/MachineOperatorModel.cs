using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Plant.Models
{
    public class MachineOperatorModel
    {
        public int MachineOperatorId { get; set; }
        public int MachineId { get; set; }
        public int OperatorId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
