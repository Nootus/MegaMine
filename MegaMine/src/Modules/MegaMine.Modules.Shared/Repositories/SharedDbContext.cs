//-------------------------------------------------------------------------------------------------
// <copyright file="SharedDbContext.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  EF database tables for shared functionality
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Shared.Repositories
{
    using MegaMine.Core.Repositories;
    using MegaMine.Modules.Shared.Entities;
    using Microsoft.EntityFrameworkCore;

    public class SharedDbContext : BaseDbContext<SharedDbContext>
    {
        public SharedDbContext(DbContextOptions<SharedDbContext> options)
            : base(options)
        {
        }

        public DbSet<BlockStateEntity> BlockStates { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // TODO: ignoring audit fields for now. This code should be removed later
            base.IgnoreAuditFields<BlockStateEntity>(builder);

            base.OnModelCreating(builder);
        }
    }
}
