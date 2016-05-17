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
            string sql = null;
            object[] parameters = new object[] { quarryRepository.AppContext.CompanyId };

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
            return await ChartFactory.Create<string, int>(options, quarryRepository.DbContext, sql, parameters);
        }
    }
}
