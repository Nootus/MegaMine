using MegaMine.Core.Repositories;
using MegaMine.Services.Widget.Entities;
using Microsoft.Data.Entity;

namespace MegaMine.Services.Widget.Repositories
{
    public class WidgetDbContext : BaseDbContext
    {
        public DbSet<WidgetEntity> Widgets { get; set; }
        public DbSet<DashboardEntity> Dashboards { get; set; }
        public DbSet<DashboardWidgetEntity> DashboardWidgets { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //TODO: ignoring audit fields for now. This code should be removed later
            IgnoreAuditFields<DashboardWidgetEntity>(builder);
            IgnoreAuditFields<DashboardEntity>(builder);

            base.OnModelCreating(builder);
        }
    }
}
