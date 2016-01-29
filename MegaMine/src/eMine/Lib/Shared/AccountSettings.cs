using eMine.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Shared
{
    public static class AccountSettings
    {
        public const string AnonymousClaim = "Anonymous";
        public const string AdminSuffix = "Admin";
        public const string DenySuffix = "_Deny";

        //SuperAdmin and GroupAdmin Roles
        public const string SuperAdminRole = "SuperAdmin";
        public const string GroupAdminRole = "GroupAdmin";

        public static string DefaultProfileUserName = "PRASANNA@NOOTUS.COM";
    }
}
    