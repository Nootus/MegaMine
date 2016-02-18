using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Models.Quarry
{
    public class ProductSummaryModel
    {
        public long RowId { get; set; }
        public int ProductTypeId { get; set; }
        public string ProductTypeName { get; set; }
        public int QuarryId { get; set; }
        public string QuarryName { get; set; }
        public int MaterialCount { get; set; }
    }
}
