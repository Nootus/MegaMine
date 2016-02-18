using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Web.Lib.Entities.Fleet
{
    [Table("SparePart")]
    public class SparePartEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SparePartId  { get; set; }
        public string SparePartName { get; set; }
        public string SparePartDescription { get; set; }
        public string ManufacturingBrand { get; set; }
        public int AvailableQuantity { get; set; }
    }
}
