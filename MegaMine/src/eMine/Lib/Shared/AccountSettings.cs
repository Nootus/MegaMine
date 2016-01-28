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

        public static string DefaultProfileUserName = "MEGAMINE@NOOTUS.COM";
    }
}
    