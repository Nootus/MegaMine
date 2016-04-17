using MegaMine.Core.Widgets;
using MegaMine.Modules.Quarry.Repositories;
using System.Threading.Tasks;

namespace MegaMine.Modules.Quarry.Domain
{
    public class WidgetDomain
    {
        private WidgetRepository widgetRepository;
        public WidgetDomain(WidgetRepository widgetRepository)
        {
            this.widgetRepository = widgetRepository;
        }
        public async Task<object> GetWidgetData(int widgetId)
        {
            switch (widgetId)
            {
                case 1:
                    return await ChartFactory.Create<string, int>(widgetRepository.DbContext, "quarry.WidgetQuarryColourMaterialCounts @CompanyId = {0}", widgetRepository.AppContext.CompanyId);
                case 2:
                    return await ChartFactory.Create<string, int>(widgetRepository.DbContext, "quarry.WidgetQuarryMaterialCounts @CompanyId = {0}", widgetRepository.AppContext.CompanyId);
                case 3:
                    return await ChartFactory.Create<string, int>(widgetRepository.DbContext, "quarry.WidgetQuarryProductTypeMaterialCounts @CompanyId = {0}", widgetRepository.AppContext.CompanyId); 
            }
            return null;
        }

        public async Task<ChartDataModel<string, int>> QuarryMaterialCounts()
        {
            return await widgetRepository.QuarryMaterialCounts();
        }
    }
}
