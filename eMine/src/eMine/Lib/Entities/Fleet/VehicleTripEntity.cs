using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet 
{
    public class VehicleTripEntity : BaseEntity
    {
        public int VehicleTripId { get; set; }

        public string VehicleTripName { get; set; }
        public int VehicleId { get; set; }
        public int VehicleDriverId { get; set; }
        public Decimal? OdometerStart { get; set; }
        public Decimal? OdometerEnd { get; set; }
        public DateTime StartingTime { get; set; }
        public DateTime ReachingTime { get; set; }
    }
}
