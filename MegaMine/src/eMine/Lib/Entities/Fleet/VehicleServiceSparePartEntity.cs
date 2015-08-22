using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class VehicleServiceSparePartEntity : BaseEntity
    {
        public int VehicleServiceSparePartId { get; set; }
        public int VehicleServiceId { get; set; }
        public int ConsumedUnits { get; set; }
        public int SparePartId { get; set; }

        public VehicleServiceEntity VehicleService { get; set; }
    }
}
