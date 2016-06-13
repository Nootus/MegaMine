using MegaMine.Core.Models.Widget;
using MegaMine.Services.Widget.Repositories;
using System.Threading.Tasks;

namespace MegaMine.Services.Widget.Domain
{
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
            int dashboardId = await widgetRepository.GetDashboardId(pageId);
            model.AllWidgets = await widgetRepository.WidgetsGet(dashboardId);
            model.PageWidgets = await widgetRepository.PageWidgetsGet(dashboardId);
            return model;
        }
    }
}
