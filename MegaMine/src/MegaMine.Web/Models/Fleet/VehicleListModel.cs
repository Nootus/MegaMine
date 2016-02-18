using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Fleet
{
    public class VehicleListModel
    {
        public int VehicleId { get; set; }
        public string RegistrationNumber { get; set; }
        public string VehicleType { get; set; }
        public string VehicleModel { get; set; }
        public decimal? FuelAverage { get; set; }
        public string Driver { get; set; }
        public DateTime? LastServiceDate { get; set; }
        public decimal TotalServiceCost { get; set; }
    }
}
