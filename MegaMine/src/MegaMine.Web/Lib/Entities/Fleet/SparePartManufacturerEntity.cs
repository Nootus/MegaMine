using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Fleet
{
    [Table("SparePartManufacturer")]
    public class SparePartManufacturerEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SparePartManufacturerId { get; set; }
        public int SparePartId { get; set; }
        public int VehicleManufacturerId { get; set; }
        public int VehicleModelId { get; set; }
        public int VehicleTypeId { get; set; }
    }
}
