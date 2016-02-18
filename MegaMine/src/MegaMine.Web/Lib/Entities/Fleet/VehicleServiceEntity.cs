using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Web.Lib.Entities.Fleet
{
    [Table("VehicleService")]
    public class VehicleServiceEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleServiceId { get; set; }
        public int VehicleId { get; set; }
        public string Compliant { get; set; }
        public DateTime? ServiceStartDate { get; set; }
        public DateTime? ServiceDeliveryDate { get; set; }
        public decimal TotalServiceCost { get; set; }
        public decimal MiscServiceCost { get; set; }
        public string Description { get; set; }

        public VehicleEntity Vehicle { get; set; }
    }
}
