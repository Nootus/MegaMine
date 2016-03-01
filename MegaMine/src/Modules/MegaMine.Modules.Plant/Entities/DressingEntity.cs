using MegaMine.Core.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Modules.Plant.Entities
{
    [Table("Dressing", Schema = "plant")]
    public class DressingEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DressingId { get; set; }
        public int MachineId { get; set; }
        public DateTime ProcessDate { get; set; }
    }
}
