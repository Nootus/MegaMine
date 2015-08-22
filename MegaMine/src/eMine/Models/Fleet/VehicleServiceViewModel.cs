using eMine.Lib.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Fleet
{
    public class VehicleServiceViewModel
    {
        public int VehicleServiceId { get; set; }
        public int VehicleId { get; set; }
        public string Compliant { get; set; }
        public string Description { get; set; }
        public decimal? MiscCost { get; set; }
        public string Reason { get; set; }
        public DateTime? ServiceDate { get; set; }
        public decimal? ServiceCost { get; set; }

        public List<SparePartModel> SpareParts { get; set; }

        public List<ListItem<int, string>> SparePartsLookup { get; set; }
    }
}


