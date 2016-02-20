using MegaMine.Core.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Web.Lib.Entities.Quarry
{
    [Table("Quarry")]
    public class QuarryEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuarryId { get; set; }
        public string QuarryName { get; set; }
        public string Location { get; set; }
    }
}
