using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Quarry
{
    public class QuarryMaterialColourEntity : BaseEntity
    {
        public int QuarryMaterialColourId { get; set; }
        public int QuarryId { get; set; }
        public int MaterialColourId { get; set; }

        public virtual QuarryEntity Quarry { get; set; }
    }
}
