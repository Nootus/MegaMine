using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Quarry
{
    [Table("Quarry")]
    public class QuarryEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuarryId { get; set; }
        public string QuarryName { get; set; }
        public string Location { get; set; }
        public List<int> ProductType { get; set; }
    }
}
