using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Plant.Models
{
    public class DressingModel
    {
        public int DressingId { get; set; }
        public int MachineId { get; set; }
        public DateTime ProcessDate { get; set; }

        public List<BlockDressingModel> Blocks { get; set; }
    }
}
