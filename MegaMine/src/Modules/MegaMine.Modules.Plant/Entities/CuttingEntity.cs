using MegaMine.Core.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Modules.Plant.Entities
{
    [Table("Cutting", Schema = "plant")]
    public class CuttingEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CuttingId { get; set; }
        public int MachineId { get; set; }
        public DateTime ProcessDate { get; set; }
    }
}
