using MegaMine.Core.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Web.Lib.Entities.Fleet
{
    [Table("Vehicle")]
    public class VehicleEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleId { get; set; }

        public string RegistrationNumber { get; set; }
        public int VehicleTypeId { get; set; } 
        public int VehicleManufacturerId { get; set; }
        public int VehicleModelId { get; set; }
        public int? VehicleDriverId { get; set; }
        public int? VehicleDriverAssignmentId { get; set; }

        public decimal? FuelAverage { get; set; }
        public DateTime? FuelResetDate { get; set; }

        public DateTime? LastServiceDate { get; set; }
        public decimal TotalServiceCost { get; set; }

        public virtual VehicleTypeEntity VehicleType { get; set; }
        public virtual VehicleDriverAssignmentEntity VehicleDriverAssignment { get; set; }
    }
}
