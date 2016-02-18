using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Quarry
{
    [Table("MaterialColour")]
    public class MaterialColourEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaterialColourId { get; set; }
        public string ColourName { get; set; }
        public string ColourDescription { get; set; }
    }
}
