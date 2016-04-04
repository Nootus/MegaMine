using Microsoft.AspNet.Identity.EntityFramework;

namespace MegaMine.Modules.Security.Entities
{
    public class ApplicationRole : IdentityRole
    {
        public int CompanyId { get; set; }
        public int RoleType { get; set; }
    }
}

