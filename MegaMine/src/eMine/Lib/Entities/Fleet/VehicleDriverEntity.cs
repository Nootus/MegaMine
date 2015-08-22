using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class VehicleDriverEntity : BaseEntity
    {
        public int   VehicleDriverId { get; set; }
        public string  DriverName { get; set; }
        public string  Contact { get; set; }
        public string  PhotoUrl { get; set; }

    }
}
