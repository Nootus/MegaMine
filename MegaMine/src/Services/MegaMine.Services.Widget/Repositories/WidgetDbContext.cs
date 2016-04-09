using MegaMine.Core.Repositories;
using MegaMine.Services.Widget.Entities;
using Microsoft.Data.Entity;

namespace MegaMine.Services.Widget.Repositories
{
    public class WidgetDbContext : BaseDbContext
    {
        public DbSet<DashboardEntity> Dashboards { get; set; }
        public DbSet<WidgetEntity> Widgets { get; set; }
        public DbSet<DashboardWidgetEntity> DashboardWidgets { get; set; }
        public DbSet<DashboardPageWidgetEntity> DashboardPageWidgets { get; set; }
        public DbSet<ChartTypeEntity> ChartTypes { get; set; }

        //protected override void OnModelCreating(ModelBuilder builder)
        //{
        //    //TODO: ignoring audit fields for now. This code should be removed later
        //    IgnoreAuditFields<DashboardPageWidgetEntity>(builder);

        //    base.OnModelCreating(builder);
        //}
    }
}
