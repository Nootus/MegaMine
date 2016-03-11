using MegaMine.Core.Repositories;
using MegaMine.Modules.Shared.Entities;
using Microsoft.Data.Entity;

namespace MegaMine.Modules.Shared.Repositories
{
    public class SharedDbContext : BaseDbContext
    {
        public DbSet<BlockStateEntity> BlockStates { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            //TODO: ignoring audit fields for now. This code should be removed later
            IgnoreAuditFields<BlockStateEntity>(builder);

            base.OnModelCreating(builder);
        }
    }
}
