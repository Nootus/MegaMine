using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Fleet
{
    public class SparePartManufacturerModel
    {

        public int SparePartManufacturerId { get; set; } 
        public int ManufacturerID { get; set; } 
        public int VehicleModelId { get; set; } 
    }
}
