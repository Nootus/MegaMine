//-------------------------------------------------------------------------------------------------
// <copyright file="BaseDbContext.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Base class for DBContext.
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Core.Repositories
{
    using MegaMine.Core.Entities;
    using Microsoft.EntityFrameworkCore;

    public class BaseDbContext<TContext> : DbContext
        where TContext : DbContext
    {
        public BaseDbContext(DbContextOptions<TContext> options)
            : base(options)
        {
        }

        protected void IgnoreAuditFields<TEntity>(ModelBuilder builder)
            where TEntity : BaseEntity
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
