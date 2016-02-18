using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Fleet
{
    public class VehicleManufactureModelModel
    {
        public int VehicleModelId { get; set; }
        public int VehicleManufacturerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
