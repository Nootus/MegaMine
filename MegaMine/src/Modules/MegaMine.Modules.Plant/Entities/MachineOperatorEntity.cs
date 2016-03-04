using MegaMine.Core.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Modules.Plant.Entities
{
    [Table("MachineOperator", Schema = "plant")]
    public class MachineOperatorEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MachineOperatorId { get; set; }
        public int MachineId { get; set; }
        public int OperatorId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
