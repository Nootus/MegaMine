using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class VehicleEntity : BaseEntity
    {
        public int VehicleId { get; set; }

        public string RegistrationNumber { get; set; }
        public int VehicleTypeId { get; set; } //foreign key
        public int VehicleManufacturerId { get; set; }
        public int VehicleModelId { get; set; }
        public decimal? FuelAverage { get; set; }
        public int? VehicleDriverId { get; set; }
        public int? VehicleDriverAssignmentId { get; set; }

        public DateTime? LastServiceDate { get; set; }
        public decimal TotalServiceCost { get; set; }

        public bool? UsedVehicleInd  { get; set; }

        public decimal? VehicleProcurementCost { get; set; }
        public DateTime? VehiclePurchasedDate { get; set; }
        public bool? VehicleSoldInd { get; set; }
        public DateTime? VehicleSoldDate { get; set; }
        public decimal? VehicleSoldCost { get; set; }

        public virtual VehicleTypeEntity VehicleType { get; set; }
        public virtual VehicleDriverAssignmentEntity VehicleDriverAssignment { get; set; }
    }
}
