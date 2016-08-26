//-------------------------------------------------------------------------------------------------
// <copyright file="PlantDbContext.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  EF context for plant tables
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Repositories
{
    using MegaMine.Core.Repositories;
    using MegaMine.Modules.Plant.Entities;
    using Microsoft.EntityFrameworkCore;

    public class PlantDbContext : BaseDbContext<PlantDbContext>
    {
        public PlantDbContext(DbContextOptions<PlantDbContext> options)
            : base(options)
        {
        }

        public DbSet<MachineEntity> Machines { get; set; }

        public DbSet<BladeEntity> Blades { get; set; }

        public DbSet<OperatorEntity> Operators { get; set; }

        public DbSet<DressingEntity> Dressings { get; set; }

        public DbSet<BlockDressingEntity> BlockDressings { get; set; }

        public DbSet<CuttingEntity> Cuttings { get; set; }

        public DbSet<BlockCuttingEntity> BlockCuttings { get; set; }

        public DbSet<MachineStoppageEntity> MachineStoppages { get; set; }

        public DbSet<MachineOperatorEntity> MachineOperators { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // TODO: ignoring audit fields for now. This code should be removed later
            this.IgnoreAuditFields<MachineEntity>(builder);
            this.IgnoreAuditFields<BladeEntity>(builder);
            this.IgnoreAuditFields<OperatorEntity>(builder);
            this.IgnoreAuditFields<DressingEntity>(builder);
            this.IgnoreAuditFields<BlockDressingEntity>(builder);
            this.IgnoreAuditFields<CuttingEntity>(builder);
            this.IgnoreAuditFields<BlockCuttingEntity>(builder);
            this.IgnoreAuditFields<MachineStoppageEntity>(builder);
            this.IgnoreAuditFields<MachineOperatorEntity>(builder);

            base.OnModelCreating(builder);
        }
    }
}
