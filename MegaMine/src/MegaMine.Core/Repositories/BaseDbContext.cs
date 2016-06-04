using MegaMine.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace MegaMine.Core.Repositories
{
    public class BaseDbContext<T> : DbContext where T: DbContext
    {
        public BaseDbContext(DbContextOptions<T> options)
            : base(options)
        {
        }

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
