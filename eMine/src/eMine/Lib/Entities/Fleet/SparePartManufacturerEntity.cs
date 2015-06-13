using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class SparePartManufacturerEntity : BaseEntity
    {
       public int SparePartManufacturerId { get; set; }
       public int ManufacturerID { get; set; }
       public int VehicleModelId { get; set; }

    }
}
