using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class VehicleDriverAssignmentEntity : BaseEntity
    {
        public int VehicleDriverAssignmentId { get; set; }
        public int VehicleDriverId { get; set; }
        public int VehicleId { get; set; }
        public DateTime AssignmentStartDate { get; set; }
        public DateTime? AssignmentEndDate { get; set; }
    }
}
