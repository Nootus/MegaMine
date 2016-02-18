using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Fleet
{
    [Table("VehicleManufacturer")]
    public class VehicleManufacturerEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleManufacturerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
