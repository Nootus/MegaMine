using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Models.Quarry
{
    public class ProductSummarySearchModel
    {
        public int[] QuarryIds { get; set; }
        public int[] ProductTypeIds { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
