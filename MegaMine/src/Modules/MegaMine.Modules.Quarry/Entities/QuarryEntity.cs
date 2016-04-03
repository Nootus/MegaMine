using MegaMine.Core.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Modules.Quarry.Entities
{
    [Table("Quarry", Schema = "quarry")]
    public class QuarryEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuarryId { get; set; }
        public string QuarryName { get; set; }
        public string Location { get; set; }
    }
}
