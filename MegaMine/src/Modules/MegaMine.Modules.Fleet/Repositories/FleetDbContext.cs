//-------------------------------------------------------------------------------------------------
// <copyright file="FleetDbContext.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  EF DbContext for Fleet
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Lib.Repositories
{
    using MegaMine.Core.Repositories;
    using MegaMine.Web.Lib.Entities.Fleet;
    using Microsoft.EntityFrameworkCore;

    public class FleetDbContext : BaseDbContext<FleetDbContext>
    {
        public FleetDbContext(DbContextOptions<FleetDbContext> options)
            : base(options)
        {
        }

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

        public DbSet<VehicleDriverAssignmentEntity> VehicleDriverAssignments { get; set; }

        public DbSet<SparePartManufacturerEntity> SparePartManufacturers { get; set; }

        public DbSet<VehicleTripEntity> VehicleTrips { get; set; }
    }
}
