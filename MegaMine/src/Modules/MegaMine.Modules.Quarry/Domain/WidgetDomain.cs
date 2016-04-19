using MegaMine.Core.Widgets;
using MegaMine.Modules.Quarry.Repositories;
using System.Threading.Tasks;

namespace MegaMine.Modules.Quarry.Domain
{
    public class WidgetDomain
    {
        private QuarryRepository quarryRepository;
        public WidgetDomain(QuarryRepository quarryRepository)
        {
            this.quarryRepository = quarryRepository;
        }
        public async Task<object> GetWidgetData(int widgetId, WidgetOptions options)
        {
            switch (widgetId)
            {
                case 1:
                    return await ChartFactory.Create<string, int>(options, quarryRepository.DbContext, "quarry.WidgetQuarryMaterialCounts @CompanyId = {0}", quarryRepository.AppContext.CompanyId);
                case 2:
                    return await ChartFactory.Create<string, int>(options, quarryRepository.DbContext, "quarry.WidgetQuarryProductTypeMaterialCounts @CompanyId = {0}", quarryRepository.AppContext.CompanyId);
                case 3:
                    return await ChartFactory.Create<string, int>(options, quarryRepository.DbContext, "quarry.WidgetQuarryMaterialColourMaterialCounts @CompanyId = {0}", quarryRepository.AppContext.CompanyId);
                case 4:
                    return await ChartFactory.Create<string, int>(options, quarryRepository.DbContext, "quarry.WidgetProductTypeMaterialCounts @CompanyId = {0}", quarryRepository.AppContext.CompanyId);
                case 5:
                    return await ChartFactory.Create<string, int>(options, quarryRepository.DbContext, "quarry.WidgetProductTypeQuarryMaterialCounts @CompanyId = {0}", quarryRepository.AppContext.CompanyId);
                case 6:
                    return await ChartFactory.Create<string, int>(options, quarryRepository.DbContext, "quarry.WidgetProductTypeMaterialColourMaterialCounts @CompanyId = {0}", quarryRepository.AppContext.CompanyId);
            }
            return null;
        }
    }
}
