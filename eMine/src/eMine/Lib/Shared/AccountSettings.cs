using eMine.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Shared
{
    public static class AccountSettings
    {
        public static List<string> SiteAdmin = new List<string>() { "SuperAdmin", "GroupAdmin", "CompanyAdmin" };

        public const string AdminSuffix = "Admin";

        public static ProfileModel DefaultProfile = new ProfileModel() {
                                                    UserID = "",
                                                    UserName = "prasanna@nootus.com",
                                                    FirstName = "Prasanna",
                                                    LastName = "Pattam"
                                                };
    }
}
    