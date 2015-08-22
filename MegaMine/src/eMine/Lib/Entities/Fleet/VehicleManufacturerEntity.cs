using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class VehicleManufacturerEntity : BaseEntity
    {
        public int VehicleManufacturerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
