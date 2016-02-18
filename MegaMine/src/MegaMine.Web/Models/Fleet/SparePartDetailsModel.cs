using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MegaMine.Web.Lib.Entities;
using MegaMine.Web.Lib.Entities.Fleet;
using MegaMine.Web.Models;

namespace MegaMine.Web.Models.Fleet
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
