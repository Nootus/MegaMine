using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Web.Lib.Entities.Fleet
{
    [Table("VehicleServiceSparePart")]
    public class VehicleServiceSparePartEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleServiceSparePartId { get; set; }
        public int VehicleServiceId { get; set; }
        public int ConsumedUnits { get; set; }
        public int SparePartId { get; set; }

        public VehicleServiceEntity VehicleService { get; set; }
    }
}
