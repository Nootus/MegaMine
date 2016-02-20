using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MegaMine.Web.Lib.Entities;
using MegaMine.Web.Lib.Entities.Fleet;
using MegaMine.Web.Models;
using MegaMine.Models.Common;

namespace MegaMine.Web.Models.Fleet
{
    public class SparePartModel
    {
        public int  VehicleServiceSparePartId { get; set; }
        public int SparePartId { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string ManufacturingBrand { get; set; }        
        public string Description { get; set; }
        public int VehicleManufacturerId { get; set; }
        public int VehicleModelId { get; set; }
        public int VehicleTypeId { get; set; }

        public List<ListItem<int, string>> VehicleTypeList { get; set; }
        public List<ListItem<int, string>> ManufacturerList { get; set; }
        public List<VehicleManufactureModelModel> VehicleModelList { get; set; }
    }
}


