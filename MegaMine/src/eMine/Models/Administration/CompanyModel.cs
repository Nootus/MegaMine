using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Administration
{
    public class CompanyModel 
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public bool GroupInd { get; set; }
        public int? ParentCompanyId { get; set; }

        public override bool Equals(object obj)
        {
            return CompanyId.Equals(((CompanyModel)obj).CompanyId);
        }

        public override int GetHashCode()
        {
            return CompanyId.GetHashCode();
        }
    }
}
