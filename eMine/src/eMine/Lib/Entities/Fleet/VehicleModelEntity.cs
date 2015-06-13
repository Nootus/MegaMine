using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class VehicleModelEntity : BaseEntity
    {
       public int VehicleModelId { get; set; }
       public int VehicleManufacturerId { get; set; }
       public string Name { get; set; }
       public string Description { get; set; }

    }
}
