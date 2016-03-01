using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Plant.Entities
{
    [Table("Dressing", Schema = "plant")]
    public class BlockDressingEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BlockDressingId { get; set; }
        public int MachineId { get; set; }
        public DateTime ProcessDate { get; set; }
    }
}
