using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class VehicleServiceEntity : BaseEntity
    {
        public int VehicleServiceId { get; set; }

        public int VehicleId { get; set; }
        public string Compliant { get; set; }
        public DateTime? ServiceStartDate { get; set; }
        public DateTime? ServiceDeliveryDate { get; set; }
        public decimal? TotalServiceCost { get; set; }
        public decimal? MiscServiceCost { get; set; }
        public string Description { get; set; }

        public VehicleEntity Vehicle { get; set; }
    }
}
