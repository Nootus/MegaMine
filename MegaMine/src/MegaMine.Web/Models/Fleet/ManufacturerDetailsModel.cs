using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Models.Fleet
{
    public class ManufacturerDetailsModel
    {
        public int VehicleManufacturerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public List<VehicleManufactureModelModel> Models { get; set; }

    }
}
