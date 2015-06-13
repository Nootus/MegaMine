using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Fleet
{
    public class VehicleServiceModel
    {
        public int VehicleServiceId { get; set; }
        public DateTime? ServiceDate { get; set; }
        public string Compliant { get; set; }
        public decimal? ServiceCost { get; set; }
    }
}
