using System;

namespace MegaMine.Modules.Quarry.Models
{
    public class ProductSummarySearchModel
    {
        public int[] QuarryIds { get; set; }
        public int[] ProductTypeIds { get; set; }
        public int[] MaterialColourIds { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
