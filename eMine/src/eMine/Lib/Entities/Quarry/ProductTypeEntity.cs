using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Quarry
{
    public class ProductTypeEntity : BaseEntity
    {
        public int ProductTypeId { get; set; }
        public string ProductTypeName { get; set; }
        public string ProductTypeDescription { get; set; }
    }
}
