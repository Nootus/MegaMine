using eMine.Lib.Entities.Account;
using eMine.Lib.Entities.Fleet;
using eMine.Lib.Shared;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Microsoft.Framework.ConfigurationModel;

namespace eMine.Lib.Repositories
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        //Account
        public DbSet<UserProfileEntity> UserProfiles { get; set; }
        public DbSet<IdentityPageEntity> IdentityPages { get; set; }
        public DbSet<IdentityRoleHierarchyEntity> IdentityRoleHierarchies { get; set; }

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
        public DbSet<VehicleFuelEntity> VehicleFuel { get; set; }
        public DbSet<ConfigurationEntity> Configurations { get; set; }
        public DbSet<VehicleDriverAssignmentEntity> VehicleDriverAssignments{ get; set; }
        public DbSet<SparePartManufacturerEntity> SparePartManufacturers { get; set; }
        public DbSet<VehicleTripEntity> VehicleTrips{ get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            // configuration for each table

            //Account
            builder.Entity<UserProfileEntity>().ForRelational().Table("UserProfile");
            builder.Entity<UserProfileEntity>().Key(k => k.UserProfileId);

            builder.Entity<IdentityPageEntity>().ForRelational().Table("IdentityPage");
            builder.Entity<IdentityPageEntity>().Key(k => k.PageId);

            builder.Entity<IdentityRoleHierarchyEntity>().ForRelational().Table("IdentityRoleHierarchy");
            //builder.Entity<IdentityRoleHierarchyEntity>().Key(k => k.RoleId );


            #region Fleet
            //VehicleType
            builder.Entity<VehicleTypeEntity>().ForRelational().Table("VehicleType");
            builder.Entity<VehicleTypeEntity>().Key(k => k.VehicleTypeId);

            //Vehicle
            builder.Entity<VehicleEntity>().ForRelational().Table("Vehicle");
            builder.Entity<VehicleEntity>().Key(k => k.VehicleId);

            //VehicleService
            builder.Entity<VehicleServiceEntity>().ForRelational().Table("VehicleService");
            builder.Entity<VehicleServiceEntity>().Key(k => k.VehicleServiceId);

            //VehicleServiceSparePart
            builder.Entity<VehicleServiceSparePartEntity>().ForRelational().Table("VehicleServiceSparePart");
            builder.Entity<VehicleServiceSparePartEntity>().Key(k => k.VehicleServiceSparePartId);

            //VehicleServiceSparePart
            builder.Entity<SparePartEntity>().ForRelational().Table("SparePart");
            builder.Entity<SparePartEntity>().Key(k => k.SparePartId);

            //VehicleServiceSparePartOrder
            builder.Entity<VehicleServiceSparePartOrderEntity>().ForRelational().Table("VehicleServiceSparePartOrder");
            builder.Entity<VehicleServiceSparePartOrderEntity>().Key(k => k.VehicleServiceSparePartOrderId);

            //SparePartOrder
            builder.Entity<SparePartOrderEntity>().ForRelational().Table("SparePartOrder");
            builder.Entity<SparePartOrderEntity>().Key(k => k.SparePartOrderId);

            //VehicleDriver
            builder.Entity<VehicleDriverEntity>().ForRelational().Table("VehicleDriver");
            builder.Entity<VehicleDriverEntity>().Key(k => k.VehicleDriverId);


            // VehicleManufacturer
            builder.Entity<VehicleManufacturerEntity>().ForRelational().Table("VehicleManufacturer");
            builder.Entity<VehicleManufacturerEntity>().Key(k => k.VehicleManufacturerId);

            //VehicleModel
            builder.Entity<VehicleModelEntity>().ForRelational().Table("VehicleModel");
            builder.Entity<VehicleModelEntity>().Key(k => k.VehicleModelId);


            //VehicleFuel 
            builder.Entity<VehicleFuelEntity>().ForRelational().Table("VehicleFuel");
            builder.Entity<VehicleFuelEntity>().Key(k => k.VehicleFuelId);

            //Configuration
            builder.Entity<ConfigurationEntity>().ForRelational().Table("Configuration");
            builder.Entity<ConfigurationEntity>().Key(k => k.ConfigurationId);

            //VehicleDriverAssignment
            builder.Entity<VehicleDriverAssignmentEntity>().ForRelational().Table("VehicleDriverAssignment");
            builder.Entity<VehicleDriverAssignmentEntity>().Key(k => k.VehicleDriverAssignmentId);

            //[SparePartManufacturer]
            builder.Entity<SparePartManufacturerEntity >().ForRelational().Table("SparePartManufacturer");
            builder.Entity<SparePartManufacturerEntity >().Key(k => k.SparePartManufacturerId);
            
            //[VehicleTrip]
            builder.Entity<VehicleTripEntity>().ForRelational().Table("VehicleTrip");
            builder.Entity<VehicleTripEntity>().Key(k => k.VehicleTripId);
            #endregion

            base.OnModelCreating(builder);

            //renaming identity tables
            builder.Entity<ApplicationUser>().ForRelational().Table("IdentityUser");
            builder.Entity<IdentityRole>().ForRelational().Table("IdentityRole");
            builder.Entity<IdentityRoleClaim<string>>().ForRelational().Table("IdentityRoleClaim");
            builder.Entity<IdentityUserClaim<string>>().ForRelational().Table("IdentityUserClaim");
            builder.Entity<IdentityUserLogin<string>>().ForRelational().Table("IdentityUserLogin");
            builder.Entity<IdentityUserRole<string>>().ForRelational().Table("IdentityUserRole");

        }
    }
}
