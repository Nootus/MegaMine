using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class SparePartEntity : BaseEntity
    {
        public int SparePartId  { get; set; }
        public string SparePartName { get; set; }
        public string SparePartDescription { get; set; }
        public string ManufacturingBrand { get; set; }
        public int AvailableQuantity { get; set; }

    }
}
