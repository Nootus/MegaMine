using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Quarry
{
    public class YardEntity : BaseEntity
    {
        public int YardId { get; set; }
        public string YardName { get; set; }
        public string Location { get; set; }
        public int? QuarryId { get; set; }

        public QuarryEntity Quarry { get; set; }
    }
}
