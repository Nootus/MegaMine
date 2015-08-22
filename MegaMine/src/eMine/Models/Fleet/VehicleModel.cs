using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using eMine.Lib.Entities;
using eMine.Lib.Entities.Fleet;
using eMine.Models;

namespace eMine.Models.Fleet
{
    public class VehicleModel
    {
        
        public int VehicleId { get; set; }
        public string RegistrationNumber { get; set; }
        public string VehicleType { get; set; }
        public int VehicleTypeId { get; set; }

        public int VehicleManufacturerId { get; set; }
        public int VehicleModelId { get; set; }

        public List<ListItem<int, string>> VehicleTypeList { get; set; }
        public List<ListItem<int, string>> ManufacturerList { get; set; }
        public List<VehicleManufactureModelModel> VehicleModelList { get; set; }

    }
}
