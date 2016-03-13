using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Shared.Models
{
    public class BlockStateModel
    {
        public int BlockId { get; set; }
        public string BlockNumber { get; set; }
        public int State { get; set; }
    }
}
