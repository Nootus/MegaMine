using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using eMine.Lib.Entities;
using eMine.Lib.Entities.Fleet;
using eMine.Models;

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

        public string VehicleManufacturer { get; set; }
        public string VehicleModel { get; set; }
        public string VehicleType { get; set; }
        
    }
}
