using System;

namespace MegaMine.Modules.Quarry.Models
{
    public class QuarrySummarySearchModel
    {
        public int QuarryId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
