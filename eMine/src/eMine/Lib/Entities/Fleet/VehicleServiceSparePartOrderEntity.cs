using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class VehicleServiceSparePartOrderEntity : BaseEntity
    {
        public int VehicleServiceSparePartOrderId { get; set; }
        public int VehicleServiceId { get; set; }
        public int ConsumedUnits { get; set; }
        public int SparePartOrderId { get; set; }

        public VehicleServiceEntity VehicleService { get; set; }
    }
}
