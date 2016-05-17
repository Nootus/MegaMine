using MegaMine.Services.Security.Models;

namespace MegaMine.Services.Security.Common
{
    public static class SecuritySettings
    {
        public const string AnonymousClaim = "Anonymous";
        public const string AnonymouseClaimType = "Home"; 
        public const string AdminSuffix = "Admin";
        public const string DenySuffix = "_Deny";

        public static string NootusProfileUserName = "PRASANNA@NOOTUS.COM";
        public static int NootusCompanyId = 1;

        public static int[] AdminRoles = new int[] { (int)RoleType.SuperAdmin, (int)RoleType.GroupAdmin, (int)RoleType.CompanyAdmin };
        public static int[] SuperGroupAdminRoles = new int[] { (int)RoleType.SuperAdmin, (int)RoleType.GroupAdmin };
    }
}
    