using eMine.Lib.Entities.Account;
using eMine.Lib.Entities.Administration;
using eMine.Lib.Entities.Fleet;
using eMine.Lib.Entities.Quarry;
using eMine.Lib.Shared;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Microsoft.Framework.ConfigurationModel;

namespace eMine.Lib.Repositories
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        //Account
        public DbSet<IdentityClaimEntity> IdentityClaims { get; set; }
        public DbSet<IdentityPageEntity> IdentityPages { get; set; }
        public DbSet<IdentityPageClaimEntity> IdentityPageClaims { get; set; }
        public DbSet<IdentityRoleHierarchyEntity> IdentityRoleHierarchies { get; set; }
        public DbSet<UserProfileEntity> UserProfiles { get; set; }
        public DbSet<UserCompanyEntity> UserCompanies { get; set; }

        //Administration
        public DbSet<CompanyEntity> Companies { get; set; }

        //Fleet
        public DbSet<VehicleTypeEntity> VehicleTypes { get; set; }
        public DbSet<VehicleEntity> Vehicles { get; set; }
        public DbSet<VehicleServiceEntity> VehicleServices { get; set; }
        public DbSet<VehicleServiceSparePartEntity> VehicleServiceSpareParts { get; set; }
        public DbSet<SparePartEntity> SpareParts { get; set; }
        public DbSet<SparePartOrderEntity> SparePartOrders { get; set; }
        public DbSet<VehicleServiceSparePartOrderEntity> VehicleServiceSparePartOrders { get; set; }
        public DbSet<VehicleDriverEntity> VehicleDrivers { get; set; }
        public DbSet<VehicleManufacturerEntity> VehicleManufacturers { get; set; }
        public DbSet<VehicleModelEntity> VehicleModels { get; set; }
        public DbSet<VehicleFuelEntity> VehicleFuels { get; set; }
        public DbSet<ConfigurationEntity> Configurations { get; set; }
        public DbSet<VehicleDriverAssignmentEntity> VehicleDriverAssignments{ get; set; }
        public DbSet<SparePartManufacturerEntity> SparePartManufacturers { get; set; }
        public DbSet<VehicleTripEntity> VehicleTrips{ get; set; }

        //Quarry
        public DbSet<MaterialColourEntity> MaterialColours { get; set; }
        public DbSet<ProductTypeEntity> ProductTypes { get; set; }
        public DbSet<QuarryEntity> Quarries { get; set; }
        public DbSet<QuarryMaterialColourEntity> QuarryMaterialColours { get; set; }
        public DbSet<YardEntity> Yards { get; set; }
        public DbSet<MaterialEntity> Materials { get; set; }
        public DbSet<MaterialMovementEntity> MaterialMovements { get; set; }
        public DbSet<ProductSummaryEntity> ProductSummary { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<IdentityRoleHierarchyEntity>().HasKey(e => new { e.RoleId, e.ChildRoleId });
            builder.Entity<UserCompanyEntity>().HasKey(e => new { e.UserProfileId, e.CompanyId });



            base.OnModelCreating(builder);

            //renaming identity tables
            builder.Entity<ApplicationUser>().ToTable("IdentityUser");
            builder.Entity<IdentityRole>().ToTable("IdentityRole");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("IdentityRoleClaim");
            builder.Entity<IdentityUserClaim<string>>().ToTable("IdentityUserClaim");
            builder.Entity<IdentityUserLogin<string>>().ToTable("IdentityUserLogin");
            builder.Entity<IdentityUserRole<string>>().ToTable("IdentityUserRole");
        }
    }
}
