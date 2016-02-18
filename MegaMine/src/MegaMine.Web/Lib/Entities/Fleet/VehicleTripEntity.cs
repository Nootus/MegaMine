using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Web.Lib.Entities.Fleet 
{
    [Table("VehicleTrip")]
    public class VehicleTripEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleTripId { get; set; }
        public string VehicleTripName { get; set; }
        public int VehicleId { get; set; }
        public int VehicleDriverId { get; set; }
        public Decimal? OdometerStart { get; set; }
        public Decimal? OdometerEnd { get; set; }
        public DateTime StartingTime { get; set; }
        public DateTime ReachingTime { get; set; }
    }
}
