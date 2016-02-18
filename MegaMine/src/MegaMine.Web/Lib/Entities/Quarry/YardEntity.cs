using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Quarry
{
    [Table("Yard")]
    public class YardEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int YardId { get; set; }
        public string YardName { get; set; }
        public string Location { get; set; }
        public int? QuarryId { get; set; }

        public QuarryEntity Quarry { get; set; }
    }
}
