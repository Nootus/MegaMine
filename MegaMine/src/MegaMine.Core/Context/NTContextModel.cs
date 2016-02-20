using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Context
{
    public class NTContextProfileModel
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string FullName { get { return FirstName + " " + LastName; } }
        public int CompanyId { get; set; }
    }
}
