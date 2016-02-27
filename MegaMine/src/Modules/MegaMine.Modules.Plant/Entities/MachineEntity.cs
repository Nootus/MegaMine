using MegaMine.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Plant.Entities
{
    [Table("Machine", Schema = "plant")]
    public class MachineEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MachineId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
