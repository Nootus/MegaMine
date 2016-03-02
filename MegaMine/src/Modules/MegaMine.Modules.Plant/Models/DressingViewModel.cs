using MegaMine.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Plant.Models
{
    public class DressingViewModel
    {
        public DressingModel Model { get; set; }
        public List<MachineStoppageModel> MachineStoppages { get; set; }
        public List<MachineOperatorModel> MachineOperators { get; set; }
        public List<ListItem<int, string>> Machines { get; set; }
        public List<ListItem<int, string>> Operators { get; set; }
    }
}
