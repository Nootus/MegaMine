using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Fleet
{
    [Table("VehicleModel")]
    public class VehicleModelEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleModelId { get; set; }
        public int VehicleManufacturerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
