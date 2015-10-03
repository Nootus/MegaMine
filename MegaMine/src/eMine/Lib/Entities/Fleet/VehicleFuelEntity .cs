using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Fleet
{
    [Table("VehicleFuel")]
    public class VehicleFuelEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleFuelId { get; set; }
        public int VehicleId { get; set; }
        public Decimal Odometer { get; set; }
        public Decimal Fuel { get; set; }
        public DateTime FuelDate { get; set; }
    }
}
