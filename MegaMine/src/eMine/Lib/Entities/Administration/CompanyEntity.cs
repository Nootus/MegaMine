using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Administration
{
    public class CompanyEntity : BaseEntity
    {
        public string CompanyName { get; set; }
        public bool GroupInd { get; set; }
        public int? ParentCompanyId { get; set; }
    }
}
