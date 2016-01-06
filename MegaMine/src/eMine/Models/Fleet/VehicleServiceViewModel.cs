using eMine.Lib.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Fleet
{
    public class VehicleServiceViewModel
    {
        public int VehicleServiceId { get; set; }
        public int VehicleId { get; set; }
        public string Compliant { get; set; }
        public string Description { get; set; }
        public decimal? MiscServiceCost { get; set; }
        public string Reason { get; set; }
        public DateTime? ServiceDate { get; set; }
        public decimal? TotalServiceCost { get; set; }
    }
}


