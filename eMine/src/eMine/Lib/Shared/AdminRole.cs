using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Shared
{
    public static class AdminRole
    {
        public static List<string> SiteAdmin = new List<string>() { "SuperAdmin", "GroupAdmin", "CompanyAdmin" };

        public const string AdminSuffix = "Admin";
    } 
}
    