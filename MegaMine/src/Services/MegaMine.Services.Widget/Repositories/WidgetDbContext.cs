using MegaMine.Core.Repositories;
using MegaMine.Services.Widget.Entities;
using Microsoft.Data.Entity;

namespace MegaMine.Services.Widget.Repositories
{
    public class WidgetDbContext : BaseDbContext
    {
        public DbSet<WidgetEntity> Machines { get; set; }
        public DbSet<DashboardEntity> Blades { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //TODO: ignoring audit fields for now. This code should be removed later
            IgnoreAuditFields<WidgetEntity>(builder);
            IgnoreAuditFields<DashboardEntity>(builder);

            base.OnModelCreating(builder);
        }
    }
}
