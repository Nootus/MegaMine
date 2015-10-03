using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Fleet
{
    [Table("VehicleServiceSparePartOrder")]
    public class VehicleServiceSparePartOrderEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleServiceSparePartOrderId { get; set; }
        public int VehicleServiceId { get; set; }
        public int ConsumedUnits { get; set; }
        public int SparePartOrderId { get; set; }

        public VehicleServiceEntity VehicleService { get; set; }
    }
}
