using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Models.Quarry
{
    public class YardModel
    {
        public int YardId { get; set; }
        public string YardName { get; set; }
        public string Location { get; set; }
        public int? QuarryId { get; set; }
    }
}
