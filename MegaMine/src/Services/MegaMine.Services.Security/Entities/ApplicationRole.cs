using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace MegaMine.Services.Security.Entities
{
    public class ApplicationRole : IdentityRole
    {
        public int CompanyId { get; set; }
        public int RoleType { get; set; }
    }
}

