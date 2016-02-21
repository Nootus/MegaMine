using MegaMine.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Modules.Quarry.Entities
{
    [Table("QuarryMaterialColour")]
    public class QuarryMaterialColourEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuarryMaterialColourId { get; set; }
        public int QuarryId { get; set; }
        public int MaterialColourId { get; set; }

        public virtual QuarryEntity Quarry { get; set; }
    }
}
