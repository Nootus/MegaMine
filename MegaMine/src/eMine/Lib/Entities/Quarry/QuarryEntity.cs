using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Quarry
{
    public class QuarryEntity : BaseEntity
    {
        public int QuarryId { get; set; }
        public string QuarryName { get; set; }
        public string Location { get; set; }
        public List<int> ProductType { get; set; }
    }
}
