using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Services.Security.Models
{
    public class ClaimModel
    {
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
    }

    public class ClaimModelComparer : IEqualityComparer<ClaimModel>
    {
        public bool Equals(ClaimModel x, ClaimModel y)
        {
            return x.ClaimType == y.ClaimType && x.ClaimValue == y.ClaimValue;
        }

        public int GetHashCode(ClaimModel obj)
        {
            return new { obj.ClaimType, obj.ClaimValue }.GetHashCode();
        }
    }
}
