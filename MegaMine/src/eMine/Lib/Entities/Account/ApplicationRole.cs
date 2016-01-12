using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Account
{
    public class ApplicationRole : IdentityRole
    {
        public bool IsAdmin { get; set; }
    }
}

