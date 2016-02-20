using MegaMine.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Web.Lib.Entities.Fleet
{
    [Table("VehicleType")]
    public class VehicleTypeEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleTypeId { get; set; }
        public string VehicleTypeName { get; set; }
	    public string VehicleTypeDescription { get; set; }
    }
}
