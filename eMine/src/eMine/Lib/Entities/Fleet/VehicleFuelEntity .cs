using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class VehicleFuelEntity : BaseEntity
    {
       public int VehicleFuelId { get; set; }
       public int VehicleId { get; set; }
       public Decimal Odometer { get; set; }
       public Decimal Fuel { get; set; }
       public DateTime FuelDate { get; set; }
    }
}
