using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Fleet
{
    public class VehicleDetailsModel
    {
        public int VehicleId { get; set; }
        public string RegistrationNumber { get; set; }
        public string VehicleType { get; set; }
        public string Manufacturer { get; set; }
        public string VehicleModel { get; set; }
        public string Driver { get; set; }
        public int? VehicleDriverAssignmentId { get; set; }
        public decimal? FuelAverage { get; set; }
        public decimal? ServiceCost { get; set; }
        public DateTime? ServiceDate { get; set; }

        public List<VehicleServiceModel> ServiceRecord { get; set; }
    }
}
