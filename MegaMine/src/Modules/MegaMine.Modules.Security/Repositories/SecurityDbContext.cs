using MegaMine.Modules.Security.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;

namespace MegaMine.Modules.Security.Repositories
{
    public class SecurityDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public DbSet<IdentityClaimEntity> IdentityClaims { get; set; }
        public DbSet<IdentityPageEntity> IdentityPages { get; set; }
        public DbSet<IdentityMenuPageEntity> IdentityMenuPages { get; set; }
        public DbSet<IdentityPageClaimEntity> IdentityPageClaims { get; set; }
        public DbSet<IdentityRoleHierarchyEntity> IdentityRoleHierarchies { get; set; }
        public DbSet<UserProfileEntity> UserProfiles { get; set; }
        public DbSet<UserCompanyEntity> UserCompanies { get; set; }
        public DbSet<IdentityCompanyClaimEntity> IdentityCompanyClaims { get; set; }
        public DbSet<CompanyEntity> Companies { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<IdentityRoleHierarchyEntity>(entity =>
            {
                entity.HasKey(e => new { e.RoleId, e.ChildRoleId });
            });

            builder.Entity<UserCompanyEntity>(entity =>
            {
                entity.HasKey(e => new { e.UserProfileId, e.CompanyId });
            });


            base.OnModelCreating(builder);

            //renaming identity tables
            builder.Entity<ApplicationUser>().ToTable("IdentityUser");
            builder.Entity<ApplicationRole>().ToTable("IdentityRole");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("IdentityRoleClaim");
            builder.Entity<IdentityUserClaim<string>>().ToTable("IdentityUserClaim");
            builder.Entity<IdentityUserLogin<string>>().ToTable("IdentityUserLogin");
            builder.Entity<IdentityUserRole<string>>().ToTable("IdentityUserRole");
        }
    }
}
