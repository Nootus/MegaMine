using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Quarry
{
    public class MaterialColourEntity : BaseEntity
    {
        public int MaterialColourId { get; set; }
        public string ColourName { get; set; }
        public string ColourDescription { get; set; }
    }
}
