using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Fleet
{
    public class SparePartDetailsModel
    {
        public int SparePartId { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string ManufacturingBrand { get; set; }
        public string Description { get; set; }

        public List<SparePartOrderModel> Orders { get; set; }

    }
}
