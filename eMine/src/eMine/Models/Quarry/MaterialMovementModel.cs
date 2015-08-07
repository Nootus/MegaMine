using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Quarry
{
    public class MaterialMovementModel
    {
        public int[] MaterialMovementIds { get; set; }
        public int FromYardId { get; set; }
        public int ToYardId { get; set; }
        public DateTime MovementDate { get; set; }
    }
}
