using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Models.Fleet
{
    public class VehicleServiceModel
    {
        public int VehicleServiceId { get; set; }
        public int VehicleId { get; set; }
        public string Compliant { get; set; }
        public DateTime? ServiceDate { get; set; }
        public decimal MiscServiceCost { get; set; }
        public decimal TotalServiceCost { get; set; }
        public string Description { get; set; }
    }
}
