using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class VehicleTypeEntity : BaseEntity
    {
        public int VehicleTypeId { get; set; }
        public string VehicleTypeName { get; set; }
	    public string VehicleTypeDescription { get; set; }

    }
}
