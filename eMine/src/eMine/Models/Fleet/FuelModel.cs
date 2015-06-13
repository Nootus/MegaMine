using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Fleet
{
    public class FuelModel
    {

        public int VehicleFuelId { get; set; } 
        public int VehicleId { get; set; } 
        public Decimal Odometer { get; set; } 
        public Decimal Quantity { get; set; } 
        public DateTime FuelDate { get; set; } 
    }
}
