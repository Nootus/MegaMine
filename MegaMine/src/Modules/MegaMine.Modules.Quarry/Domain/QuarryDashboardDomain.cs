//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryDashboardDomain.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Used by the dashboard in Quarry
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Domain
{
    using System.Threading.Tasks;
    using MegaMine.Core.Models.Dashboard;
    using MegaMine.Modules.Quarry.Repositories;

    public class QuarryDashboardDomain : BaseDashboardDomain
    {
        private QuarryRepository repository;

        public QuarryDashboardDomain(QuarryRepository quarryRepository)
        {
            this.repository = quarryRepository;
        }

        public override async Task<ChartModel<string, int>> GetWidgetData(int widgetId, WidgetOptions options)
        {
            string sql = null;
            object[] parameters = new object[] { this.CompanyId };

            switch (widgetId)
            {
                case 1:
                    sql = "quarry.WidgetQuarryMaterialCounts @CompanyId = {0}";
                    break;
                case 2:
                    sql = "quarry.WidgetQuarryProductTypeMaterialCounts @CompanyId = {0}";
                    break;
                case 3:
                    sql = "quarry.WidgetQuarryMaterialColourMaterialCounts @CompanyId = {0}";
                    break;
                case 4:
                    sql = "quarry.WidgetProductTypeMaterialCounts @CompanyId = {0}";
                    break;
                case 5:
                    sql = "quarry.WidgetProductTypeQuarryMaterialCounts @CompanyId = {0}";
                    break;
                case 6:
                    sql = "quarry.WidgetProductTypeMaterialColourMaterialCounts @CompanyId = {0}";
                    break;
                case 7:
                    sql = "quarry.WidgetMaterialColourMaterialCounts @CompanyId = {0}";
                    break;
                case 8:
                    sql = "quarry.WidgetMaterialColourQuarryMaterialCounts @CompanyId = {0}";
                    break;
                case 9:
                    sql = "quarry.WidgetMaterialColourProductTypeMaterialCounts @CompanyId = {0}";
                    break;
                case 10:
                    sql = "quarry.WidgetYardMaterialCounts @CompanyId = {0}";
                    break;
                case 11:
                    sql = "quarry.WidgetYardProductTypeMaterialCounts @CompanyId = {0}";
                    break;
            }

            return await ChartFactory.Create<string, int>(options, this.repository.DbContext, sql, parameters);
        }
    }
}
