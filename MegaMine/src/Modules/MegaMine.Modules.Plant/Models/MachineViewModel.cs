using MegaMine.Core.Models;
using System.Collections.Generic;

namespace MegaMine.Modules.Plant.Models
{
    public class MachineViewModel
    {
        public List<MachineModel> Machines { get; set; }
        public List<ListItem<int, string>> Blades { get; set; }
    }
}
