using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Fleet
{
    public class VehicleDriverAssignmentModel
    {

        public int VehicleDriverAssignmentId { get; set; } 
        public int VehicleDriverId { get; set; } 
        public string DriverName { get; set; }
        public int VehicleId { get; set; }
        public DateTime AssignmentStartDate { get; set; } 
        public DateTime? AssignmentEndDate { get; set; } 
    }
}
