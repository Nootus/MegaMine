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
        public DbSet<IdentityPageEntity> IdentityPages { get; set; }
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
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // configuration for each table

            #region Account

            //Account
            builder.Entity<UserProfileEntity>(e => 
            {
                e.ToTable("UserProfile");
                e.Key(k => k.UserProfileId);
            });

            builder.Entity<IdentityPageEntity>(e =>
            {
                e.ToTable("IdentityPage");
                e.Key(k => k.PageId);
            });

            builder.Entity<IdentityRoleHierarchyEntity>(e =>
            {
                e.ToTable("IdentityRoleHierarchy");
                //e.Key(k => k.RoleId);
            });


            builder.Entity<UserCompanyEntity>(e =>
            {
                e.ToTable("UserCompany");
                e.Key(k => new { k.UserProfileId, k.CompanyId });
            });


            //Administration
            builder.Entity<CompanyEntity>(e =>
            {
                e.ToTable("Company");
                e.Key(k => k.CompanyId);
            });

            #endregion

            #region Fleet
            //VehicleType
            builder.Entity<VehicleTypeEntity>(e =>
            {
                e.ToTable("VehicleType");
                e.Key(k => k.VehicleTypeId);
            });


            //Vehicle
            builder.Entity<VehicleEntity>(e =>
            {
                e.ToTable("Vehicle");
                e.Key(k => k.VehicleId);
            });

            //VehicleService
            builder.Entity<VehicleServiceEntity>(e =>
            {
                e.ToTable("VehicleService");
                e.Key(k => k.VehicleServiceId);
            });

            //VehicleServiceSparePart
            builder.Entity<VehicleServiceSparePartEntity>(e =>
            {
                e.ToTable("VehicleServiceSparePart");
                e.Key(k => k.VehicleServiceSparePartId);
            });

            //VehicleServiceSparePart
            builder.Entity<SparePartEntity>(e =>
            {
                e.ToTable("SparePart");
                e.Key(k => k.SparePartId);
            });

            //VehicleServiceSparePartOrder
            builder.Entity<VehicleServiceSparePartOrderEntity>(e =>
            {
                e.ToTable("VehicleServiceSparePartOrder");
                e.Key(k => k.VehicleServiceSparePartOrderId);
            });

            //SparePartOrder
            builder.Entity<SparePartOrderEntity>(e =>
            {
                e.ToTable("SparePartOrder");
                e.Key(k => k.SparePartOrderId);
            });

            //VehicleDriver
            builder.Entity<VehicleDriverEntity>(e =>
            {
                e.ToTable("VehicleDriver");
                e.Key(k => k.VehicleDriverId);
            });

            // VehicleManufacturer
            builder.Entity<VehicleManufacturerEntity>(e =>
            {
                e.ToTable("VehicleManufacturer");
                e.Key(k => k.VehicleManufacturerId);
            });

            //VehicleModel
            builder.Entity<VehicleModelEntity>(e =>
            {
                e.ToTable("VehicleModel");
                e.Key(k => k.VehicleModelId);
            });

            //VehicleFuel 
            builder.Entity<VehicleFuelEntity>(e =>
            {
                e.ToTable("VehicleFuel");
                e.Key(k => k.VehicleFuelId);
            });

            //Configuration
            builder.Entity<ConfigurationEntity>(e =>
            {
                e.ToTable("Configuration");
                e.Key(k => k.ConfigurationId);
            });

            //VehicleDriverAssignment
            builder.Entity<VehicleDriverAssignmentEntity>(e =>
            {
                e.ToTable("VehicleDriverAssignment");
                e.Key(k => k.VehicleDriverAssignmentId);
            });

            //[SparePartManufacturer]
            builder.Entity<SparePartManufacturerEntity>(e =>
            {
                e.ToTable("SparePartManufacturer");
                e.Key(k => k.SparePartManufacturerId);
            });

            //[VehicleTrip]
            builder.Entity<VehicleTripEntity>(e =>
            {
                e.ToTable("VehicleTrip");
                e.Key(k => k.VehicleTripId);
            });
            #endregion

            #region Quarry

            //MaterialColour
            builder.Entity<MaterialColourEntity>(e =>
            {
                e.ToTable("MaterialColour");
                e.Key(k => k.MaterialColourId);
            });

            //ProductType
            builder.Entity<ProductTypeEntity>(e =>
            {
                e.ToTable("ProductType");
                e.Key(k => k.ProductTypeId);
            });

            //Quarry
            builder.Entity<QuarryEntity>(e =>
            {
                e.ToTable("Quarry");
                e.Key(k => k.QuarryId);
            });

            //Quarry Material Colour
            builder.Entity<QuarryMaterialColourEntity>(e =>
            {
                e.ToTable("QuarryMaterialColour");
                e.Key(k => k.QuarryMaterialColourId);
            });

            //Yard
            builder.Entity<YardEntity>(e =>
            {
                e.ToTable("Yard");
                e.Key(k => k.YardId);
            });

            //Material
            builder.Entity<MaterialEntity>(e =>
            {
                e.ToTable("Material");
                e.Key(k => k.MaterialId);
            });

            //MaterialMovement
            builder.Entity<MaterialMovementEntity>(e =>
            {
                e.ToTable("MaterialMovement");
                e.Key(k => k.MaterialMovementId);
            });           
            #endregion

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
