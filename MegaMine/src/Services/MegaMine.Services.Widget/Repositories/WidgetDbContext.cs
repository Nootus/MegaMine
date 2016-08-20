//-------------------------------------------------------------------------------------------------
// <copyright file="WidgetDbContext.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Context to store widget related tables
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Widget.Repositories
{
    using MegaMine.Core.Repositories;
    using MegaMine.Services.Widget.Entities;
    using Microsoft.EntityFrameworkCore;

    public class WidgetDbContext : BaseDbContext<WidgetDbContext>
    {
        public WidgetDbContext(DbContextOptions<WidgetDbContext> options)
            : base(options)
        {
        }

        public DbSet<DashboardEntity> Dashboards { get; set; }

        public DbSet<WidgetEntity> Widgets { get; set; }

        public DbSet<DashboardWidgetEntity> DashboardWidgets { get; set; }

        public DbSet<DashboardPageWidgetEntity> DashboardPageWidgets { get; set; }

        public DbSet<ChartTypeEntity> ChartTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // TODO: ignoring audit fields for now. This code should be removed later
            this.IgnoreAuditFields<DashboardPageWidgetEntity>(builder);

            base.OnModelCreating(builder);
        }
    }
}
