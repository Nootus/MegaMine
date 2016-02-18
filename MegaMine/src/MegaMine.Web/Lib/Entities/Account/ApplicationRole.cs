using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Lib.Entities.Account
{
    public class ApplicationRole : IdentityRole
    {
        public int CompanyId { get; set; }
        public int RoleType { get; set; }
    }
}

