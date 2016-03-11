using MegaMine.Core.Entities;
using Microsoft.Data.Entity;

namespace MegaMine.Core.Repositories
{
    public class BaseDbContext : DbContext
    {
        protected void IgnoreAuditFields<TEntity>(ModelBuilder builder) where TEntity : BaseEntity
        {
            builder.Entity<TEntity>(e =>
            {
                e.Ignore(p => p.CreatedDate);
                e.Ignore(p => p.CreatedUserId);
                e.Ignore(p => p.LastModifiedUserId);
            });
        }
    }
}
