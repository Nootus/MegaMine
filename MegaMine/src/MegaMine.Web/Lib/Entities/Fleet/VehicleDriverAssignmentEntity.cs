using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Fleet
{
    [Table("VehicleDriverAssignment")]
    public class VehicleDriverAssignmentEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleDriverAssignmentId { get; set; }
        public int VehicleDriverId { get; set; }
        public int VehicleId { get; set; }
        public DateTime AssignmentStartDate { get; set; }
        public DateTime? AssignmentEndDate { get; set; }
    }
}
