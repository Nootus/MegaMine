using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Fleet
{
    [Table("VehicleDriver")]
    public class VehicleDriverEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int   VehicleDriverId { get; set; }
        public string  DriverName { get; set; }
        public string  Contact { get; set; }
        public string  PhotoUrl { get; set; }
    }
}
