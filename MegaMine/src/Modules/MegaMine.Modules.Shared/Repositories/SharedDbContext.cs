using MegaMine.Core.Repositories;
using MegaMine.Modules.Shared.Entities;
using Microsoft.EntityFrameworkCore;

namespace MegaMine.Modules.Shared.Repositories
{
    public class SharedDbContext : BaseDbContext<SharedDbContext>
    {
        public DbSet<BlockStateEntity> BlockStates { get; set; }
        public SharedDbContext(DbContextOptions<SharedDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //TODO: ignoring audit fields for now. This code should be removed later
            IgnoreAuditFields<BlockStateEntity>(builder);

            base.OnModelCreating(builder);
        }

    }
}
