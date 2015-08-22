using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Quarry
{
    public class MaterialMovementEntity : BaseEntity
    {
        public int MaterialMovementId { get; set; }
        public int MaterialId { get; set; }
        public int FromYardId { get; set; }
        public int ToYardId { get; set; }
        public DateTime MovementDate { get; set; }
        public bool CurrentInd { get; set; }

        public MaterialEntity Material { get; set; }
    }
}
