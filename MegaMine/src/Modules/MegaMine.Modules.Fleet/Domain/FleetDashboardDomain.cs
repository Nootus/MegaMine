//-------------------------------------------------------------------------------------------------
// <copyright file="FleetDashboardDomain.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Used by the dashboard in Fleet
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Domain
{
    using System.Threading.Tasks;
    using MegaMine.Core.Models.Dashboard;
    using MegaMine.Modules.Fleet.Repositories;

    public class FleetDashboardDomain : BaseDashboardDomain
    {
        private FleetRepository repository;

        public FleetDashboardDomain(FleetRepository fleetRepository)
        {
            this.repository = fleetRepository;
        }

        public override async Task<ChartModel<string, int>> GetWidgetData(int widgetId, WidgetOptions options)
        {
            string sql = null;
            object[] parameters = new object[] { this.CompanyId };

            switch (widgetId)
            {
                default:
                    break;
            }

            return await ChartFactory.Create<string, int, FleetDbContext>(options, this.repository.DbContext, sql, parameters);
        }
    }
}
