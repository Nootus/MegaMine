//-------------------------------------------------------------------------------------------------
// <copyright file="FleetDbContext.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  EF DbContext for Fleet
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Repositories
{
    using MegaMine.Core.Repositories;
    using MegaMine.Modules.Fleet.Entities;
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

        public DbSet<VehicleDriverEntity> VehicleDrivers { get; set; }

        public DbSet<VehicleManufacturerEntity> VehicleManufacturers { get; set; }

        public DbSet<VehicleModelEntity> VehicleModels { get; set; }

        public DbSet<VehicleFuelEntity> VehicleFuels { get; set; }

        public DbSet<VehicleDriverAssignmentEntity> VehicleDriverAssignments { get; set; }

        public DbSet<VehicleTripEntity> VehicleTrips { get; set; }
    }
}
