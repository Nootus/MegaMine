using Microsoft.AspNet.Identity.EntityFramework;

namespace MegaMine.Services.Security.Entities
{
    public class ApplicationRole : IdentityRole
    {
        public int CompanyId { get; set; }
        public int RoleType { get; set; }
    }
}

