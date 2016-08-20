//-------------------------------------------------------------------------------------------------
// <copyright file="WidgetDomain.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Domain object to fetch the widgets for showing on the UI
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Widget.Domain
{
    using System.Threading.Tasks;
    using MegaMine.Core.Models.Widget;
    using MegaMine.Services.Widget.Repositories;

    public class WidgetDomain : IWidgetDomain
    {
        private WidgetRepository widgetRepository;

        public WidgetDomain(WidgetRepository widgetRepository)
        {
            this.widgetRepository = widgetRepository;
        }

        public async Task<DashboardModel> DashboardGet(int pageId)
        {
            DashboardModel model = new DashboardModel();
            int dashboardId = await this.widgetRepository.GetDashboardId(pageId);
            model.AllWidgets = await this.widgetRepository.WidgetsGet(dashboardId);
            model.PageWidgets = await this.widgetRepository.PageWidgetsGet(dashboardId);
            return model;
        }
    }
}
